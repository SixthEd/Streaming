import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const signinCall = useCallback(() => {
        navigate("/signin");
        console.log("run");
    }, [navigate]);

    const loginCall = useCallback(() => {
        navigate("/login");
        console.log("run");
    }, [navigate]);

    return (
        <div>
            <div id="nav-firstpage">
                <div id="nav">
                    <div id="logo">
                        <a href="/">
                            <img src="./netflixlogo.png" alt=""></img>
                        </a>
                    </div>
                    <div id="nav-right">
                        <div id="lang">lang</div>
                        <div id="signIn">
                            <button
                                id="sign-button"
                                onClick={() => loginCall()}
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>

                <div id="first-page">
                    <h1>Unlimited movies, TV shows and more</h1>
                    <h3>Starts at ₹149. Cancel at any time.</h3>
                    <h3>
                        Ready to watch? Enter your email to create or restart
                        your membership.
                    </h3>
                    <div id="input-button">
                        <input type="email" placeholder="Email address" />
                        <button onClick={() => signinCall()}>
                            <div>Get Start</div>
                            <div>&gt;</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
