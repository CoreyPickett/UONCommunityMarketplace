import React from "react";
import './login.css'
import { Link } from "react-router-dom";

const Login = () => {
  return(
  <div className="wrapper">
    <form action="">
      <h1>Login</h1>
      <div className="inputbox">
        <input type="text" placeholder="Username" required/>
      </div>
      <div className="inputbox">
        <input type="password" placeholder="Password" required/>
      </div>
      <div className="remember-forgot">
        <label><input type="checkbox"/>Remember Me</label>
        <a href="#">Forgot Password?</a>
      </div>

      <button type="submit">Login</button>

      <div className="registration link">
        <p>No Account? <Link to="/registration">Register Here!</Link></p>
      </div>

    </form>
    </div>
);

};

export default Login
