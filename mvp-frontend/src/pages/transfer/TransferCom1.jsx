const TransferCom1 = () => {

    return(
        <> 
        <div className="transfer-page-container">
            <form action="" className="transfer-form">
                <div className="show1">
                    <input type="" placeholder="Bank"/><br />
                    <input type="number" placeholder="Account number"/><br />
                    <p className="account-user-name">John Doe</p>
                </div>
                <div className="hide1">
                    <div><span>₦</span><input type="number" placeholder="Amount" /></div><br />
                    <input type="text" placeholder="Narration"/><br />
                    <div className="hide2">
                        <p>An otp has been sent to your email</p>
                        <input type="text" placeholder="Enter OTP"/>

                    </div>
                    <input type="submit" value="Send"/>
                </div>
            </form>
        </div>
        </>
    )
}

export default TransferCom1