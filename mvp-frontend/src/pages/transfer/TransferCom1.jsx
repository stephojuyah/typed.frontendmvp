import { useState, useEffect } from "react";
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
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [countdown, setCountdown] = useState(180);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(120);

  
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

  useEffect(() => {
    let timer;
    if (transferSent && otpCountdown > 0 && !isLocked) {
      timer = setInterval(() => {
        setOtpCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [transferSent, otpCountdown, isLocked]);


  const handleResendOtp = async () => {
    setLoading(true);
    setError("");
    setOtp("");
    try {
      const res = await fetch(`${baseURL}/transfer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: userEmail,
          bank: bank.toString(),
          account_no: account_no.toString(),
          amount: amount.toString(),
          narration
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to resend OTP");
      alert("A new OTP has been sent to your email!");

      setOtpCountdown(120);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  const handleSendTransfer = async () => {

    const savedBalance = localStorage.getItem("accountBalance") || 784038.14;
    const currentBalance = parseFloat(savedBalance);

    if (!amount || !narration) {
      setError("Please enter amount and narration");
      return;
    }

    if (parseFloat(amount) > currentBalance) {
      setError("Insufficient balance to perform this transaction.");
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
          bank: bank.toString(),
          account_no: account_no.toString(),
          amount: amount.toString(),
          narration
        })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Transfer failed");
      
      setTransferSent(true);
      setOtpCountdown(120);
      alert("OTP sent to your email!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmOtp = async (e) => {
    e.preventDefault();
    if (isLocked) return; 
  
    setLoading(true);
    setError("");
  
    try {
      const res = await fetch(`${baseURL}/transfer`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         credentials: "include",
        body: JSON.stringify({
          email: userEmail,
          bank: bank.toString(),
          otp: otp.toString(),
          account_no: account_no.toString(),
          amount: amount.toString(),
          narration 
        })
      });
      const data = await res.json();
  
      if (!res.ok) {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);


  
        if (newAttempts >= 3) {
          setIsLocked(true);
          setError("");            
          setOtp("");              
          setOtpCountdown(0);
          setTransferSent(false);
          startLockoutTimer();
          return;
        }

        if (newAttempts < 3) {
          throw new Error(data.message || `Invalid OTP. ${3 - newAttempts} attempts left.`);
        }
      }

      const savedBalance = localStorage.getItem("accountBalance") || 784038.14;
      const newBalance = parseFloat(savedBalance) - parseFloat(amount);
        
      localStorage.setItem("accountBalance", newBalance);

    const newTx = {
      id: Date.now(),
      name: beneficiaryName,
      time: `${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase()} ~ ${new Date().toLocaleDateString()}`,
      amount: parseFloat(amount),
      type: "debit"
    };

    const existingTxs = JSON.parse(localStorage.getItem("transactions")) || [
      { id: 1, name: "Stephanie Ojuyah", time: "4:30pm ~ 7/1/2026", amount: 200000, type: "credit" },
      { id: 2, name: "Fortune Osokor", time: "1:46am ~ 7/1/2026", amount: 40000, type: "debit" },
      { id: 3, name: "Pascal Ossai", time: "8:33pm ~ 6/1/2026", amount: 146000, type: "debit" }
    ];

localStorage.setItem("transactions", JSON.stringify([newTx, ...existingTxs]));
  
      setShowSuccessModal(true);
      setAttempts(0); 

      setShowSuccessModal(true);
  
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };  

  const startLockoutTimer = () => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsLocked(false);
          setAttempts(0); 
          setCountdown(180); 
          return 180;
        }
        return prev - 1;
      });
    }, 1000);
  };


const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};
  
  return (
    <div className="transfer-page-container">

      {isLocked && (
        <div className="lockout-overlay">
          <div className="lockout-content">
            <div className="lock-icon">🔒</div>
            <h1>Account Temporarily Locked</h1>
            <p>Too many incorrect OTP attempts. For your security, please wait before trying again.</p>
            <div className="timer-display">{formatTime(countdown)}</div>
            <p className="timer-subtext">You can try again once the timer reaches 0:00</p>
          </div>
        </div>
      )}



      <form className="transfer-form" onSubmit={handleConfirmOtp}>

        
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

      
        <input
          type="number"
          placeholder="Account number"
          value={account_no}
          onChange={(e) => setaccount_no(e.target.value)}
        />
        <br />

        
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

              if (!/^\d{10}$/.test(account_no)) {
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

            <div className="resend-options" style={{ marginTop: "20px" }}>
                {otpCountdown > 0 && !isLocked && (
                  <p style={{ fontSize: "14px", color: "#666" }}>
                    OTP expires in: <span style={{ fontWeight: "bold", color: "#000" }}>{formatTime(otpCountdown)}</span>
                  </p>
                )} 

                { !isLocked && otpCountdown <= 0 && (
                  <button 
                    type="button" 
                    onClick={handleResendOtp} 
                    style={{ background: "none", border: "none", color: "blue", textDecoration: "underline", cursor: "pointer", fontWeight: "bold" }}
                  >
                  Request another OTP
                  </button>
                 
                )}
            </div>
          </>
        )}



        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="success-modal">
            <div className="check-icon">✅</div> 
            <h2>Success!</h2>
            <p>Your transfer of ₦{amount} to {beneficiaryName} was successful.</p>
            <button className="ok-btn" onClick={() => navigate("/dashboard")}>
              Okay
            </button>
          </div>
        </div>
      )}



    </div>
  );
};

export default TransferCom1;

