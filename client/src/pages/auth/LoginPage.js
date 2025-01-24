import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import styles from 'styles/Login.module.css'
import classNames from 'classnames';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Trying to log in.');
            const response = await axios.post('http://localhost:3001/api/login', {
                email: username,
                password: password
            });
            const { token, userType } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('userType', userType);

            console.log('Login user type is: ' + userType);

            if (userType === 'Admin') {
                navigate('/admin/admin-dashboard');
            } else if (userType === 'Strategist') {
                navigate('/strategist/strategist-dashboard');
            }
            else if (userType === 'Student') {
                navigate('/student/student-dashboard');
            }
            else if (userType === 'Liaison') {
                navigate('/liaison/dashboard');
            }
            else if (userType === 'Student Advisor') {
                navigate('/studentAdvisor/student-adv-dashboard');
            }
            else {
                // Handle unexpected user types
                console.error('Unexpected user type:', userType);
            }

        } catch (error) {
            console.error('Login failed:', error.response?.data?.message || error.message);
            setError(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className={styles.container}>
            <h1>Log In</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>
                    <h3>Email Address</h3>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className={styles.input}
                    />
                </label>
                <label>
                    <h3>Password</h3>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className={styles.input}
                    />
                </label>
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" className={classNames("btn", styles.btn)}>Submit</button>
                <Link to="/forgot-password"> <p> Forget Password? Click here. </p></Link>
            </form>
        </div>
    );
}
