import React from "react";
import { Link } from "react-router-dom";

const Registration = () => {
  return (
    <div className="wrapper">
      <form action="">
        <h1>Register</h1>
        <div className="inputbox">
          <input type="text" placeholder="Username" required />
        </div>
        <div className="inputbox">
          <input type="email" placeholder="Email" required />
        </div>
        <div className="inputbox">
          <input type="password" placeholder="Password" required />
        </div>
        <div className="inputbox">
          <input type="password" placeholder="Confirm Password" required />
        </div>
        <button type="submit">Register Now!</button>
        <div className="registration link">
          <p>Already have an account? <Link to="/login">Log in Here!</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Registration;