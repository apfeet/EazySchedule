import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/NavBar";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";


const clientID = "352472923886-e24gce1mtu4a3tatjjp3ts5t6v5hppki.apps.googleusercontent.com"

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username || !email || !password) {
            setAlert('All fields are required');
            return;
        }

        const PackedJson = {
            'username': username,
            'email': email,
            'password': password,
        };

        fetch("http://localhost:5000/register", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(PackedJson),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to register: " + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);

                if (data.status === "success") {
                    setAlert('Registration successful!');
                    setUsername('');
                    setEmail('');
                    setPassword('');
                    navigate("/");
                } else {
                    setAlert('Registration failed: ' + data.message);
                }
            })
            .catch(error => {
                console.error("Can't contact the server or an error occurred:", error);
                setAlert("An error occurred. Please try again later.");
            });
    };
    const registerFromGoogle = async (user) => {
        const loginuserFetch = await fetch("http://localhost:5000/register", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        const data = await loginuserFetch.json()
        if (data.status === "success") {
            navigate("/");
        }else{
            setAlert('Registration failed: ' + data.message);
        }
    }

    return (
        <>
            <NavBar />
            <div className="register-container">
                <h1 className="register-title">Register</h1>
                {alert && <div className="alert">{alert}</div>}
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <button type="submit" className="register-button">Register</button>
                </form>
                <GoogleOAuthProvider clientId={clientID}>
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            const decoded = jwtDecode(credentialResponse.credential)
                            const user =
                            {
                                "username": decoded.name,
                                "email": decoded.email,
                                "uniqueID": decoded.sub,    
                            }
                            console.log(user)
                            registerFromGoogle(user)
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                </GoogleOAuthProvider>
            </div>
        </>
    );
};



export default Register;
