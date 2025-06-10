import React, { useCallback, useState, useContext } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/VisibilityOff";
import { AuthContext } from "./AuthContext";

function Signup() {
    const [toggle, setToggle] = useState(true);
    const { registerInfo, updateRegisterInfo, sendRegisterInfo,registerErrorMessage } = useContext(AuthContext);

    const toggleEye = useCallback(() => {
        setToggle((prev) => !prev);
    }, []);


    return (
        <div>
            <div id="nav-firstpage">
                <div id="nav">
                    <div id="logo">
                        <a href="/">
                            <img src="./netflixlogo.png" alt=""></img>
                        </a>
                    </div>
                </div>

                <div id="second-page">
                    <div id="container">
                        <form onSubmit={(event)=>{event.preventDefault(); sendRegisterInfo(registerInfo)}}  id="inside-container">
                            <h1>Sign Up</h1>
                            <input type="email" placeholder="Email" onChange={(event) => { updateRegisterInfo({ ...registerInfo, email: event.target.value }) }} value={registerInfo.email} />
                            <input type="text" placeholder="Name" onChange={(event) => { updateRegisterInfo({ ...registerInfo, name: event.target.value }) }} value={registerInfo.name} />
                            <input
                                type="text" placeholder="Password" onChange={(event) => { updateRegisterInfo({ ...registerInfo, password: event.target.value }) }} value={registerInfo.password} />
                            <div className="input-eye">
                                <input type={toggle ? "password" : "text"} placeholder="Confirm Password" onChange={(event) => { updateRegisterInfo({ ...registerInfo, confirmPassword: event.target.value }) }} value={registerInfo.confirmPassword} />
                                <span onClick={() => toggleEye()}>
                                    {toggle ? (
                                        <VisibilityIcon color="info" />
                                    ) : (
                                        <VisibilityOffIcon color="info" />
                                    )}
                                </span>
                            </div>

                            <button type="submit">Sign Up</button>
                            {registerErrorMessage &&
                                <div className="errorMessage">
                                    <p>{registerErrorMessage.message}</p>
                                </div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
