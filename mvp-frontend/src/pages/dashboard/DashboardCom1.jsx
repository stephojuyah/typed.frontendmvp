import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css"
import { Link } from "react-router-dom";



const DashboardCom1 = () => {
    
    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem("isLoggedIn");
      navigate("/login");
    };

    return(
        <>
        <div className="dash-page">
            <div className="dash-container">
                <h1 className="welcome-back">Welcome back</h1>
                <nav className="dash-nav">
                    <a href="" className="da spend-nav">Spend</a>
                    <a href="/save" className="da save-nav">Save</a>
                    <a href="/borrow" className="da borrow-nav">Borrow</a>
                    <a href="/invest" className="da invest-nav">Invest</a>
                </nav>
                <p className="aza">Naira account - ##########</p>
                <div className="price-currency">
                    <div className="div1price"><h2>₦784,038.14</h2> </div>
                    <div className="div2class"><h3 className="ngn">NGN</h3></div>
                </div>
                <div className="money-stuff">
                    <Link to="/transfer" className="msa">Transfer</Link>
                    <a href="/airtime" className="msa">Airtime</a>
                    <a href="/internet" className="msa">Internet</a>
                    <a href="/betting" className="msa">Betting</a>
                    <a href="/electricity" className="msa">Electricity</a>
                </div>
                <div className="transact-div">
                    <p className="tt">Transactions</p>
                    <div className="transaction-names">
                        <div className="transact-box">
                            <span className="transact-name-span">Stephanie Ojuyah</span><br />
                            <span className="transact-timedate-span">4:30pm ~ 7/1/26</span>
                        </div>
                        <div className="price-aside"><span className="transact-price-credit">+ ₦200,000</span></div>
                    </div>
                    <div className="transaction-names">
                        <div className="transact-box">
                            <span className="transact-name-span">Fortune Osokor</span><br />
                            <span className="transact-timedate-span">1:46am ~ 7/1/26</span>
                        </div>
                        <div className="price-aside"><span className="transact-price-debit">- ₦40,000</span></div>
                    </div>
                    <div className="transaction-names">
                        <div className="transact-box">
                            <span className="transact-name-span">Pascal Ossai</span><br />
                            <span className="transact-timedate-span">8:33pm ~ 6/1/26</span>
                        </div>
                        <div className="price-aside"><span className="transact-price-debit">- ₦146,000</span></div>
                    </div>
                    <div>
                        <p className="view-more">View more</p>
                    </div>
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