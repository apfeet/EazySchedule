// src/function/CheckifUserIsLogged.js
const CheckifUserIsLogged = async () => {
    try {
        const response = await fetch("http://localhost:5000/is_logged_in", { 
            method: 'POST',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data.status === "success") {
            return { "status": true, "username": data.username };
        } else {
            return { "status": false, "username": null };
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return { "status": false, "username": null };
    }
};

export default CheckifUserIsLogged;
