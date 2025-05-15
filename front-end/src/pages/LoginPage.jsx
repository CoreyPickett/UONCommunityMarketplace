import React from "react";
import './LoginPage.css';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  async function logIn() {
      try {
        await signInWithEmailAndPassword(getAuth(), email, password);
        navigate('/items');
      } catch (e) {
        setError(e.message);
      }
    }

  return (
    <>
    <div className="wrapper">
    <form action="">
      <h1>Login</h1>
      <div className="inputbox">
        <input type="text" 
        placeholder="Email" required
        value={email}
        onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="inputbox">
        <input type="password" 
        placeholder="Password" required
        value={password}
        onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className="remember-forgot">
        <label><input type="checkbox"/> Remember Me</label>
        <a href="#"> Forgot Password?</a>
      </div>

      <button onClick={logIn}> Log In</button>

      <div className="register link">
        <Link to='/registration'> Don't have an account? Create one here</Link>
      </div>

    </form>
    </div>
    </>
  
);

};
