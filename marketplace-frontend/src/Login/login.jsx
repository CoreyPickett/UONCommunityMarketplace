import React, { useState } from "react";
import "./login.css"; // Importing the stylesheet

// Login component
const Login = () => {
  // useState hooks to manage username, password, and show/hide state
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents default page reload
    if (!username || !password) {
      alert("Please fill in all fields.");
      return;
    }
    alert(`Logging in as ${username}`);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        {/* Username input field */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Password input with show/hide toggle */}
        <div className="password-group">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Submit button */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
