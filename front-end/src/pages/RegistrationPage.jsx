import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default function Registration() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    async function registerAccount() {
        if (password !== confirmPassword) {
        setError('Password and Confirm Password do not match!');
        return;
        }

        try {
        await createUserWithEmailAndPassword(getAuth(), email, password);
        navigate('/items');
        } catch (e) {
        setError(e.message);
        }
    }

  return (
    <>
    <div className="wrapper">
      <form action="">
        <h1>Register</h1>
        {error && <p>{error}</p>}
        <div className="inputbox">
          <input type="email" 
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
        <div className="inputbox">
          <input type="password" 
            placeholder="Confirm Password" required 
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>
        <button onClick={registerAccount}>Register!</button>
        <div className="registration link">
          <Link to='/login'>Already have an account? Log In</Link>
        </div>
      </form>
    </div>
    </>
    
  );
};