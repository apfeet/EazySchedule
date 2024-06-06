import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/NavBar";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const clientID = "352472923886-e24gce1mtu4a3tatjjp3ts5t6v5hppki.apps.googleusercontent.com"

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username || !password) {
            setAlert('All fields are required');
            return;
        }

        let PackedJson = {
            'username': username,
            'password': password,
        };

        fetch("http://localhost:5000/login", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(PackedJson),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed during Login: " + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);

                if (data.status === "success") {
                    setAlert('Login successful!');
                    setUsername('');
                    setPassword('');
                    navigate("/");
                } else {
                    setAlert('Login failed: ' + data.message);
                }
            })
            .catch(error => {
                console.error("Can't contact the server or an error occurred:", error);
                setAlert("An error occurred. Please try again later.");
            });
    };

    const handleGoogleLogin = (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential)
        const user = {
            "username": decoded.name,
            "password": decoded.sub,
        }
        fetch("http://localhost:5000/login", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed during Login: " + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log(data.status);

                if (data.status === "success") {
                    setAlert('Login successful!');
                    setUsername('');
                    setPassword('');
                    navigate("/");
                } else {
                    setAlert('Login failed: ' + data.message);
                }
            })
            .catch(error => {
                console.error("Can't contact the server or an error occurred:", error);
                setAlert("An error occurred. Please try again later.");
            });
    }

    return (
        <>
            <NavBar />
            <div className="register-container">
                <h1 className="register-title">Login</h1>
                {alert && <div className="alert">{alert}</div>}
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">username</label>
                        <input
                            type="username"
                            id="username"
                            name="username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="register-button">Login</button>
                </form>
                <GoogleOAuthProvider clientId={clientID}>
                    <GoogleLogin
                        onSuccess={handleGoogleLogin}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                </GoogleOAuthProvider>
            </div>
        </>
    );
};

export default Login;
