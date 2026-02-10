// import "../../styles/register.css"
// const RegisterCom1 = () => {

//     return(
//         <> 
//         <div className="register_contain">
//             <form action="" className="register_form">
//                 <input className="register-name" type="text" placeholder="Name"/><br />
//                 <input type="email" placeholder="Email"/><br />
//                 <input className="register-date" type="date"/><br />
//                 <input type="text" placeholder="Address"/><br />
//                 <input type="password" placeholder="Password"/><br />
//                 <input type="number" placeholder="Transaction Pin"/><br />
//                 <input className="register-submit" type="submit" />
//             </form>

//         </div>
//         </>
//     )
// }

// export default RegisterCom1

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "../../styles/register.css";

const RegisterCom1 = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const baseURL = "https://bank-q7ki.vercel.app";

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${baseURL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          dob,
          address,
          password,
          pin
        })
      });

      const data = await res.json();
      console.log("Register Response:", data);

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // ✅ Success → go to login
      navigate("/login");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register_contain">
      <form className="register_form" onSubmit={handleSubmit}>

        <input
          className="register-name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />

        <input
          className="register-date"
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        /><br />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />

        <input
          type="number"
          placeholder="Transaction Pin"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          required
        /><br />

        <p className="register_message">Already have an account? <Link to="/login" className="register-link">Login</Link></p>

        {error && <p className="error-text">{error}</p>}

        <input
          className="register-submit"
          type="submit"
          value={loading ? "Registering..." : "Register"}
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default RegisterCom1;
