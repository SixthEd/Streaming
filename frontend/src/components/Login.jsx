import { useCallback, useContext, useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { AuthContext } from "./AuthContext";


function Login() {
    
    const { loginInfo, updateLoginInfo, sendLoginInfo, loginErrorMessage} = useContext(AuthContext);


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
                        <form onSubmit={(e)=>{e.preventDefault(); sendLoginInfo();}}id="inside-container">
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
                            <button type="submit">Sign In</button>
                            {loginErrorMessage &&
                                <div className="errorMessage">
                                    <p>{loginErrorMessage.message}</p>
                                </div>}
                            <h3>
                                New to Netflix?
                                <a href="/signin">Sign up now.</a>
                            </h3>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
