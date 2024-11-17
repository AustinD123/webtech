import React, { useState, useEffect } from 'react';
import './login.css';
import QuickkeysInterface from './homepage';
import InteractiveKeyboard from './keyboard';
import App from './App';

function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [userData, setUserData] = useState(null);

    // Fetch user data from the server on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/get-user-data', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data.user || null);
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        const endpoint = isLogin ? '/api/login' : '/api/register';

        try {
            const response = await fetch(`http://localhost:5000${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log('Response Data:', data); // Log the response data
            setMessage(data.message);

            if (response.ok) {
                console.log('User Data:', data.user); // Log user data
                setUserData(data.user); // Set user data on successful login
            } else {
                console.error('Login failed:', data.message);
            }

            // Clear input fields after submission
            setEmail('');
            setPassword('');
        } catch (error) {
            setMessage('An error occurred. Please try again.');
            console.error('Auth error:', error);
        }
    };

    useEffect(() => {
        console.log('User Data Updated:', userData);
    }, [userData]);

    // Render the user interface if logged in
    if (message==="Login successful") {
        console.log('Redirecting to QuickkeysInterface with userData:', userData);
        return <App />;
    }
    // Render login/register form if not logged in
    return (
        <div className="container">
            <div className="card">
                <h1 className="title">{isLogin ? 'Login' : 'Register'}</h1>
                {message && <div className="message">{message}</div>}
                <form className="form" onSubmit={handleSubmit}>
                    <div className="inputGroup">
                        <label className="label" htmlFor="email">Email</label>
                        <input
                            className="input"
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="inputGroup">
                        <label className="label" htmlFor="password">Password</label>
                        <input
                            className="input"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="buttonGroup">
                        <button className="button" type="submit">
                            {isLogin ? 'Login' : 'Register'}
                        </button>
                        <button
                            className="button"
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? 'Switch to Register' : 'Switch to Login'}
                        </button>
                    </div>
                </form>
            </div>
            <InteractiveKeyboard></InteractiveKeyboard>
        </div>
    );
}

export default AuthPage;