import React, { useEffect, useState } from 'react';
import NavBar from "../components/NavBar";
import Cards from "../components/Cards";
import { Selector } from "../components/Selector";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import '../style.css';

const options = [
    { label: "Instagram", value: "instagram" },
    { label: "Facebook", value: "facebook" },
    { label: "LinkedIn", value: "linkedin" },
];

const CreatePage = () => {
    const [selectedLabels, setSelectedLabels] = useState([]);
    const [statusCards, setStatusCards] = useState(["loading", "loading", "loading"]);
    const [accessToken, setAccessToken] = useState(null);
    const [postMessage, setPostMessage] = useState("");
    const [scheduledPosts, setScheduledPosts] = useState([]);

    useEffect(() => {
        checkCardsStatus();
        const hash = window.location.hash;
        if (hash) {
            const token = new URLSearchParams(hash.substring(1)).get('access_token');
            if (token) {
                handleInstagramToken(token);
            }
        }
    }, []);

    const handleSelectionChange = (values) => {
        const labels = values.map(value => {
            const option = options.find(opt => opt.value === value);
            return option ? option.label : '';
        });
        setSelectedLabels(labels);
    };

    const checkCardsStatus = async () => {
        try {
            const response = await fetch("http://localhost:5000/UserCardsStatus", {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({statusCards}),
            });

            if (response.ok) {
                const data = await response.json();
                setStatusCards(data.statusCards);
            } else {
                console.error('Error fetching card status:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching card status:', error);
        }
    };

    const handleInstagramToken = async (token) => {
        try {
            const res = await fetch("http://localhost:5000/InstagramConnect", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ accessToken: token })
            });
            const data = await res.json();
            setAccessToken(data.accessToken);
        } catch (error) {
            console.error('Instagram login failed:', error);
        }
    };

    const schedulePost = async () => {
        try {
            const response = await fetch("http://localhost:5000/schedulePost", {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: postMessage, accessToken }),
            });

            if (response.ok) {
                const data = await response.json();
                setScheduledPosts([...scheduledPosts, data]);
                setPostMessage("");
            } else {
                console.error('Error scheduling post:', response.statusText);
            }
        } catch (error) {
            console.error('Error scheduling post:', error);
        }
    };

    const handleInstagramLogin = () => {
        const clientId = '444863994929595';
        const redirectUri = 'http://localhost:5173/create';
        const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`;
        
        window.location.href = authUrl;
    };
    

    return (
        <>
            <NavBar />
            <div id="CreatePage_Container">
                <div className="CreatePage_Container_NewPost">
                    <Selector
                        value={selectedLabels}
                        onChange={handleSelectionChange}
                        options={options}
                        placeholder="Select Account to post to"
                    />
                    <h1>Here You can make new post</h1>
                    {accessToken ? (
                        <div>
                            <input 
                                type="text" 
                                value={postMessage}
                                onChange={(e) => setPostMessage(e.target.value)}
                                placeholder="Write your post message"
                            />
                            <button onClick={schedulePost}>Schedule Post</button>
                        </div>
                    ) : (
                        <p>Please connect to an account to schedule posts.</p>
                    )}
                </div>
                <div className="CreatePage_Container_cards_container">
                    <Cards
                        title="Instagram"
                        icon={<RiInstagramFill size={40} />}
                        status={statusCards[0]}
                        onClick={handleInstagramLogin}
                    />
                    <Cards
                        title="Facebook"
                        icon={<FaFacebook size={40} />}
                        status={statusCards[1]}
                    />
                    <Cards
                        title="LinkedIn"
                        icon={<FaLinkedin size={40} />}
                        status={statusCards[2]}
                        onClick={() => console.log("test")}
                    />
                </div>
                <div>
                    <h2>Scheduled Posts</h2>
                    <ul>
                        {scheduledPosts.map((post, index) => (
                            <li key={index}>{post.message} - Scheduled at: {post.scheduledTime}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default CreatePage;
