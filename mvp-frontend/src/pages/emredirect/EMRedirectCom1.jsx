import { Link } from "react-router-dom";

const EMRedirectCom1 = () => {

    return(
        <>
        <div className="emredirect_contain">
            <div className="emrcon2">
                <p>Create an account. <Link to="/register">register</Link></p>
                <p>Already have an account? <Link to="/login">login</Link></p>
            </div>
        </div>
        </>
    )
}

export default EMRedirectCom1