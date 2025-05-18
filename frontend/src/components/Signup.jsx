import React, { useCallback, useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/VisibilityOff";

function Signup() {
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
                            <h1>Sign Up</h1>
                            <input type="email" placeholder="Email" />
                            <input type="email" placeholder="Name" />
                            <input
                                type={toggle ? "password" : "text"}
                                placeholder="Password"
                            />
                            <div class="input-eye">
                                <input
                                    type={toggle ? "password" : "text"}
                                    placeholder="Confirm Password"
                                />
                                <span onClick={() => toggleEye()}>
                                    {toggle ? (
                                        <VisibilityIcon color="info" />
                                    ) : (
                                        <VisibilityOffIcon color="info" />
                                    )}
                                </span>
                            </div>

                            <button>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
