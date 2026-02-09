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
import "../../styles/transfer.css";

const TransferCom1 = () => {
  const [beneficiaryConfirmed, setBeneficiaryConfirmed] = useState(false);
  const [transferSent, setTransferSent] = useState(false);
  const [bank, setBank] = useState("")

  return (
    <div className="transfer-page-container">
      <form className="transfer-form">

        <div className="show1">
          <select name="bank" value={bank} onChange={(e) => setBank(e.target.value)} className={bank ? "bank-selected" : "bank-placeholder"} required>
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
          </select><br />

          <input
            className="acc-no"
            type="number"
            placeholder="Account number"
            required
          /><br />

          {!beneficiaryConfirmed && (
              <input
              type="button"
              className="ben-confirm"
              value="Confirm Beneficiary"
              onClick={() => setBeneficiaryConfirmed(true)}
              />
            )}
        </div>

        {beneficiaryConfirmed && (
            <>
            <p className="account-user-name">John Doe</p>

            <div>
              <span className="naira-sign">₦</span>
              <input className="transfer-amount" type="number" placeholder="Amount" />
            </div><br />

            <input className="narration" type="text" placeholder="Narration" /><br />

            {!transferSent && (
              <input
                type="button"
                className="ben-confirm send-confirm"
                value="Send"
                onClick={() => setTransferSent(true)}
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
            /><br />

            <input
              type="submit"
              value="Confirm"
              className="ben-confirm confirm-button"
            />
          </>
        )}

      </form>
    </div>
  );
};

export default TransferCom1;