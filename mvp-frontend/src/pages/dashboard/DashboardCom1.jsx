import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../styles/dashboard.css"
import { Link } from "react-router-dom";



const DashboardCom1 = () => {
    
    const navigate = useNavigate();

    const initialBalance = 784038.14;
    const [balance] = useState(() => {
        const saved = localStorage.getItem("accountBalance");
        return saved !== null ? parseFloat(saved) : initialBalance;
    });

    const [transactions] = useState(() => {
        const saved = localStorage.getItem("transactions");
        return saved ? JSON.parse(saved) : [
            { id: 1, name: "Stephanie Ojuyah", time: "4:30pm ~ 7/1/26", amount: 200000, type: "credit" },
            { id: 2, name: "Fortune Osokor", time: "1:46am ~ 7/1/26", amount: 40000, type: "debit" },
            { id: 3, name: "Pascal Ossai", time: "8:33pm ~ 6/1/26", amount: 146000, type: "debit" }
        ];
    });

    const formattedBalance = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
    }).format(balance);

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("token"); 
    
        const cookies = document.cookie.split(";");
        for (let cookie of cookies) {
          const eqPos = cookie.indexOf("=");
          const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        }
    
        navigate("/login");
    //   localStorage.removeItem("isLoggedIn");
    //   navigate("/login");
    };

    return(
        <>
        <div className="dash-page">
            <div className="dash-container">
                <h1 className="welcome-back">Welcome back</h1>
                <nav className="dash-nav">
                    <a href="" className="da spend-nav">Spend</a>
                    <a href="" className="da save-nav">Save</a>
                    <a href="" className="da borrow-nav">Borrow</a>
                    <a href="" className="da invest-nav">Invest</a>
                </nav>
                <p className="aza">Naira account - ##########</p>
                <div className="price-currency">
                    <div className="div1price"><h2>{formattedBalance}</h2> </div>
                    <div className="div2class"><h3 className="ngn">NGN</h3></div>
                </div>
                <div className="money-stuff">
                    <Link to="/transfer" className="msa msat">Transfer</Link>
                    <a href="" className="msa">Airtime</a>
                    <a href="" className="msa">Internet</a>
                    <a href="" className="msa">Betting</a>
                    <a href="" className="msa">Electricity</a>
                </div>
                <div className="transact-div">
                    <p className="tt">Transactions</p>
                    {transactions.map((tx) => (
                        <div className="transaction-names" key={tx.id}>
                            <div className="transact-box">
                                <span className="transact-name-span">{tx.name}</span><br />
                                <span className="transact-timedate-span">{tx.time}</span>
                            </div>
                            <div className="price-aside">
                                <span className={tx.type === "credit" ? "transact-price-credit" : "transact-price-debit"}>
                                    {tx.type === "credit" ? "+" : "-"} ₦{tx.amount.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    ))}
                    {/* <div>
                        <p className="view-more">View more</p>
                    </div> */}
                </div>
                <div className="logout-div">
                    <button className="logout-button" onClick={handleLogout}>
                      Logout
                    </button>
                </div>
            </div>
        </div>
    
        </>
    )
}

export default DashboardCom1