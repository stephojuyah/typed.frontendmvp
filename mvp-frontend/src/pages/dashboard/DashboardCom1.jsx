import "../../styles/dashboard.css"
const DashboardCom1 = () => {

    return(
        <>
        <div className="dash-page">
            <div className="dash-container">
                <h1 className="welcome-back">Welcome back, Jane Doe</h1>
                <nav className="dash-nav">
                    <a href="" className="da spend-nav">Spend</a>
                    <a href="/save" className="da save-nav">Save</a>
                    <a href="/borrow" className="da borrow-nav">Borrow</a>
                    <a href="/invest" className="da invest-nav">Invest</a>
                </nav>
                <p className="aza">Naira account - ##########</p>
                <div className="price-currency">
                 <h2>₦1,000,000.00</h2>
                 <h3 className="ngn">NGN</h3>
                </div>
                <div className="money-stuff">
                    <a href="/transfer" className="msa">Transfer</a>
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
            </div>
        </div>
    
        </>
    )
}

export default DashboardCom1