import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../login.css'; // Assuming your CSS file is correctly linked here.

const Login = () => {
    const [emailInput, setEmailInput] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:3001/login', { email: emailInput, password })
            .then(result => {
                if (result.data === "Success") {
                    alert('Login successful!');
                    localStorage.setItem('userEmail', emailInput); // Save email in localStorage
                    navigate('/home');
                } else {
                    alert('Incorrect password! Please try again.');
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container">
            <div className="card">
                <h2 className="title">Login</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="inputGroup">
                        <label htmlFor="email" className="label">Email Id</label>
                        <input 
                            type="email"
                            id="email"
                            className="input"
                            placeholder="Enter Email"
                            onChange={(event) => setEmailInput(event.target.value)}
                            required
                        />
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="password" className="label">Password</label>
                        <input 
                            type="password"
                            id="password"
                            className="input"
                            placeholder="Enter Password"
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <div className="buttonGroup">
                        <button type="submit" className="button">Login</button>
                    </div>
                </form>
                <div className="message">Don't have an account?</div>
                <div className="buttonGroup">
                    <Link to="/register" className="button switchButton">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
