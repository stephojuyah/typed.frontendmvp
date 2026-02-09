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

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";

const LoginCom1 = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const baseURL = "https://bank-q7ki.vercel.app";

  async function handleSubmit(e) {
    e.preventDefault();
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
      console.log("Login response:", data);

      if (!res.ok) {
        throw new Error(data.message || "Invalid login details");
      }

      // ✅ Save login state in localStorage
      localStorage.setItem("isLoggedIn", "true");

      // Navigate to dashboard
      navigate("/dashboard");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login_contain">
      <form className="login_form" onSubmit={handleSubmit}>
        <input
          className="login-email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />

        {error && <p className="login-error">{error}</p>}

        <input
          type="submit"
          className="login-submit-button"
          value={loading ? "Logging in..." : "Login"}
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default LoginCom1;
