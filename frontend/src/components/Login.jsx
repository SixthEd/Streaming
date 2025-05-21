import { useCallback, useContext, useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { AuthContext } from "./AuthContext";


function Login() {
    
    const { loginInfo, updateLoginInfo, sendLoginInfo} = useContext(AuthContext);


    const [toggle, setToggle] = useState(true);
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
                        <div id="inside-container">
                            <h1>Sign In</h1>
                            <input type="email" name="email" placeholder="Email" onChange={(event)=>{updateLoginInfo({...loginInfo, email:event.target.value})}} value={loginInfo.email} />
                            <div className="input-eye">
                                <input
                                    type={toggle ? "password" : "text"}
                                    placeholder="Password"
                                    onChange={(event)=>{updateLoginInfo({...loginInfo, password:event.target.value})}} value={loginInfo.password}
                                />
                                <span onClick={() => toggleEye()}>
                                    {toggle ? (
                                        <VisibilityIcon color="info" />
                                    ) : (
                                        <VisibilityOffIcon color="info" />
                                    )}
                                </span>
                            </div>
                            <button onClick={(event)=>{event.preventDefault(); sendLoginInfo()}}>Sign In</button>
                            <h3>
                                New to Netflix?
                                <a href="/signin">Sign up now.</a>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
