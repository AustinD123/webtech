import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../login.css'; // Assuming your CSS file is correctly linked here.

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:3001/register', { name, email, password })
        .then(result => {
            console.log(result);
            if (result.data === "Already registered") {
                alert("E-mail already registered! Please Login to proceed.");
                navigate('/login');
            } else {
                alert("Registered successfully! Please Login to proceed.");
                navigate('/login');
            }
        })
        .catch(err => console.log(err));
    };

    return (
        <div className="container">
            <div className="card">
                <h2 className="title">Register</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="inputGroup">
                        <label htmlFor="name" className="label">Name</label>
                        <input 
                            type="text"
                            id="name"
                            className="input"
                            placeholder="Enter Name"
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="email" className="label">Email Id</label>
                        <input 
                            type="email"
                            id="email"
                            className="input"
                            placeholder="Enter Email"
                            onChange={(event) => setEmail(event.target.value)}
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
                        <button type="submit" className="button">Register</button>
                    </div>
                </form>
                <div className="message">Already have an account?</div>
                <div className="buttonGroup">
                    <Link to="/login" className="button switchButton">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
