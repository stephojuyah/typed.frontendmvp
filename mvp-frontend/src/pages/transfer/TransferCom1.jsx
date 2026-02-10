// import "../../styles/transfer.css"
// const TransferCom1 = () => {

//     return(
//         <> 
//         <div className="transfer-page-container">
//             <form action="" className="transfer-form">
//                 <div className="show1">
//                     <select name="bank" required>
//                         <option className="black" value="" disabled selected>Bank</option>
//                         <option value="access">Access Bank</option>
//                         <option value="citibank">Citi Bank</option>
//                         <option value="ecobank">Ecobank</option>
//                         <option value="fidelity">Fidelity Bank</option>
//                         <option value="firstbank">First Bank of Nigeria</option>
//                         <option value="fcmb">FCMB</option>
//                         <option value="globus">Globus Bank</option>
//                         <option value="gtb">Guaranty Trust Bank</option>
//                         <option value="heritage">Heritage Bank</option>
//                         <option value="keystone">Keystone Bank</option>
//                         <option value="lotus">Lotus Bank</option>
//                         <option value="optimus">Optimus Bank</option>
//                         <option value="polaris">Polaris Bank</option>
//                         <option value="providus">Providus Bank</option>
//                         <option value="stanbic">Stanbic IBTC</option>
//                         <option value="standardchartered">Stantard Chartered Bank</option>
//                         <option value="sterling">Sterling Bank</option>
//                         <option value="suntrust">Suntrust Bank</option>
//                         <option value="uba">United Bank for Africa(UBA)</option>
//                         <option value="union">Union Bank</option>
//                         <option value="wema">Wema Bank</option>
//                         <option value="zenith">Zenith Bank</option>
//                         <option value="opay">Opay</option>
//                         <option value="kuda">Kuda Microfinance Bank</option>
//                         <option value="palmpay">Palmpay</option>
//                         <option value="moniepoint">Moniepoint</option>
//                         <option value="premiumtrust">Premium Trust Bank</option>
//                         <option value="lapo">LAPO Microfinance Bank</option>
//                         <option value="taj">TAJ Bank</option>
//                         <option value="sparkle">Sparkle Microfinance Bank</option>
//                     </select><br />
//                     <input className="acc-no" type="number" placeholder="Account number" required/><br />
//                     <p className="account-user-name">John Doe</p>
//                     <input className="ben-confirm" type="submit" value="Confirm Beneficiary"/>
//                 </div>
//                 <div className="hide1">
//                     <div><span className="naira-sign">₦</span><input type="number" placeholder="Amount" /></div><br />
//                     <input type="text" placeholder="Narration"/><br />
//                     <input type="submit" className="ben-confirm send-confirm" value="Send"/>
//                     <div className="hide2">
//                         <p>An otp has been sent to your email</p>
//                         <input type="number" placeholder="Enter OTP" className="enter-otp"/>

//                     </div>
//                     <input type="submit" value="Send" className="ben-confirm confirm-button" value="Confirm"/>
//                 </div>
//             </form>
//         </div>
//         </>
//     )
// }

// export default TransferCom1

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/transfer.css";

const TransferCom1 = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");

  const [bank, setBank] = useState("");
  const [account_no, setaccount_no] = useState("");
  const [beneficiaryConfirmed, setBeneficiaryConfirmed] = useState(false);
  const [amount, setAmount] = useState("");
  const [narration, setNarration] = useState("");
  const [transferSent, setTransferSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [beneficiaryName, setBeneficiaryName] = useState("");

  
  const baseURL = "https://bank-q7ki.vercel.app";

  const nigerianNames = [
    "Chinedu Okafor",
    "Aisha Bello",
    "Emeka Uche",
    "Fatima Yusuf",
    "Tunde Adeyemi",
    "Ngozi Eze",
    "Ifeanyi Nwosu",
    "Adebayo Oladele",
    "Chioma Obi",
    "Segun Ajayi",
    "Abiola Balogun",
    "Uchechi Nnamdi",
    "Kehinde Afolabi",
    "Temitope Olatunji",
    "Nkechi Onwudiwe",
    "Oluwaseun Akinlade",
    "Amaka Okoro",
    "Olumide Ige",
    "Blessing Okeke",
    "Ibrahim Sani",
    "Funke Adesanya",
    "Chuka Nwachukwu",
    "Musa Abubakar",
    "Adaobi Ezeani",
    "Seyi Ogundipe"
  ];
  
  // Send transfer and trigger OTP
  const handleSendTransfer = async () => {
    if (!amount || !narration) {
      setError("Please enter amount and narration");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch(`${baseURL}/transfer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: userEmail,
          bank,
          account_no: account_no.toString(),
          amount: amount.toString(),
          narration
        })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Transfer failed");
      
      setTransferSent(true);
      alert("OTP sent to your email!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Confirm OTP
  const handleConfirmOtp = async (e) => {
    e.preventDefault();

    if (!otp) {
      setError("Please enter OTP");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch(`${baseURL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: userEmail,
          otp,
          account_no: account_no.toString(),
          amount: amount.toString()
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "OTP verification failed");
      
      alert("Transfer successful!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="transfer-page-container">
      <form className="transfer-form" onSubmit={handleConfirmOtp}>

        {/* Bank */}
        <select
          value={bank}
          onChange={(e) => setBank(e.target.value)}
          className={bank ? "bank-selected" : "bank-placeholder"}
          >
          <option className="black" value="" disabled selected>Bank</option>
          <option value="access">Access Bank</option>
          <option value="citibank">Citi Bank</option>
          <option value="ecobank">Ecobank</option>
          <option value="fidelity">Fidelity Bank</option>
          <option value="firstbank">First Bank of Nigeria</option>
          <option value="fcmb">FCMB</option>
          <option value="globus">Globus Bank</option>
          <option value="gtb">Guaranty Trust Bank</option>
          <option value="heritage">Heritage Bank</option>
          <option value="keystone">Keystone Bank</option>
          <option value="lotus">Lotus Bank</option>
          <option value="optimus">Optimus Bank</option>
          <option value="polaris">Polaris Bank</option>
          <option value="providus">Providus Bank</option>
          <option value="stanbic">Stanbic IBTC</option>
          <option value="standardchartered">Stantard Chartered Bank</option>
          <option value="sterling">Sterling Bank</option>
          <option value="suntrust">Suntrust Bank</option>
          <option value="uba">United Bank for Africa(UBA)</option>
          <option value="union">Union Bank</option>
          <option value="wema">Wema Bank</option>
          <option value="zenith">Zenith Bank</option>
          <option value="opay">Opay</option>
          <option value="kuda">Kuda Microfinance Bank</option>
          <option value="palmpay">Palmpay</option>
          <option value="moniepoint">Moniepoint</option>
          <option value="premiumtrust">Premium Trust Bank</option>
          <option value="lapo">LAPO Microfinance Bank</option>
          <option value="taj">TAJ Bank</option>
          <option value="sparkle">Sparkle Microfinance Bank</option>
        </select>
        <br />

        {/* Account Number */}
        <input
          type="number"
          placeholder="Account number"
          value={account_no}
          onChange={(e) => setaccount_no(e.target.value)}
        />
        <br />

        {/* Confirm Beneficiary */}
        {!beneficiaryConfirmed && (
          <input
            type="button"
            className="ben-confirm"
            value={loading ? "Processing..." : "Confirm Beneficiary"}
            onClick={() => {
              if (!bank || !account_no) {
                setError("Please select a bank and enter account number");
                return;
              }

              if (account_no.length < 10) {
                setError("Account number must be 10 digits");
                return;
              }

              setError("");
              setLoading(true);

              setTimeout(() => {
                const randomName = nigerianNames[Math.floor(Math.random() * nigerianNames.length)];
                setBeneficiaryName(randomName);
                setBeneficiaryConfirmed(true);
                setLoading(false);
              }, 1000);
            }}
            disabled={loading}
          />
        )}

      
        {beneficiaryConfirmed && (
          <>
            {/* <p className="account-user-name">John Doe</p> */}
            <p className="account-user-name">{beneficiaryName}</p>

            <div>
              <span className="naira-sign">₦</span>
              <input
                className="am-input"
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <br />

            <input
              type="text"
              placeholder="Narration"
              value={narration}
              onChange={(e) => setNarration(e.target.value)}
            />
            <br />

            {!transferSent && (
              <input
                type="button"
                className="ben-confirm send-confirm"
                value={loading ? "Processing..." : "Send"}
                onClick={handleSendTransfer}
                disabled={loading}
              />
            )}
          </>
        )}

        {transferSent && (
          <>
            <p>An OTP has been sent to your email</p>

            <input
              type="number"
              placeholder="Enter OTP"
              className="enter-otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <br />

            <input
              type="submit"
              className="ben-confirm confirm-button"
              value={loading ? "Verifying..." : "Confirm"}
              disabled={loading}
            />
          </>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default TransferCom1;

