import { googleLogout } from "@react-oauth/google";
const logout = async () => {
    googleLogout();
    try {
        const response = await fetch('http://localhost:5000/logout', {
            credentials: "include",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        location.reload()
        return result;
    } catch (error) {
        console.error('Logout failed:', safeStringify(error));
        throw error; 
    }
};

export default logout;