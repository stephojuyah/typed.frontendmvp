// import "../../styles/login.css"
// const LoginCom1 = () => {

//     return(
//         <>
//         <div className="login_contain">
//             <form action="" className="login_form">
//                 <input className="login-email" type="email" placeholder="Email"/><br />
//                 <input type="password" placeholder="Password"/><br />
//                 <input type="submit" className="login-submit-button"/>
//             </form>
//         </div>
//         </>
//     )
// }

// export default LoginCom1

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/login.css";

const MAX_ATTEMPTS = 3;
const LOCK_TIME = 60 * 1000; // 1 minute

const LoginCom1 = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);

  const baseURL = "https://bank-q7ki.vercel.app";

  // Load lock state on mount
  useEffect(() => {
    const lockUntil = localStorage.getItem("lockUntil");
    if (lockUntil) {
      const remaining = Math.ceil((lockUntil - Date.now()) / 1000);
      if (remaining > 0) {
        setCountdown(remaining);
      } else {
        resetLock();
      }
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          resetLock();
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const resetLock = () => {
    localStorage.removeItem("failedAttempts");
    localStorage.removeItem("lockUntil");
    setError("");
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // Check if locked
    const lockUntil = localStorage.getItem("lockUntil");
    if (lockUntil && Date.now() < lockUntil) {
      setError(`Too many requests. Try again in ${countdown}s`);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${baseURL}/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid login details");
      }

      // ✅ SUCCESS
      resetLock();
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      navigate("/dashboard");

    } catch (err) {
      let attempts = Number(localStorage.getItem("failedAttempts")) || 0;
      attempts += 1;
      localStorage.setItem("failedAttempts", attempts);

      if (attempts > MAX_ATTEMPTS) {
        const lockTime = Date.now() + LOCK_TIME;
        localStorage.setItem("lockUntil", lockTime);
        setCountdown(60);
        setError("Too many requests. Account locked for 1 minute.");
      } else {
        setError(`Invalid login. ${MAX_ATTEMPTS - attempts + 1} attempts left`);
      }
    } finally {
      setLoading(false);
    }
  }

  const isLocked = countdown > 0;

  return (
    <div className="login_contain">
      <form className="login_form" onSubmit={handleSubmit}>
        <input
          className="login-email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLocked}
          required
        /><br />

        <input
          type="password"
          placeholder="Password"
          className="loginpassname"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLocked}
          required
        /><br />

        <p className="register_message">Don't have an account? <Link to="/register" className="register-link">Register</Link></p>

        {error && <p className="login-error">{error}</p>}

        {isLocked && (
          <p className="login-lock">
            Try again in <strong>{countdown}s</strong>
          </p>
        )}

        <input
          type="submit"
          className="login-submit-button"
          value={loading ? "Logging in..." : "Login"}
          disabled={loading || isLocked}
        />
      </form>
    </div>
  );
};

export default LoginCom1;
