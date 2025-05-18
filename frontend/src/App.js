import "./App.css";
import Home from "./components/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";

function App() {
    let user = null;

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={user ? <watch /> : <Home />}
                    ></Route>
                    <Route
                        path="/login"
                        element={user ? <watch /> : <Login />}
                    ></Route>
                    <Route
                        path="/signin"
                        element={user ? <watch /> : <Signup />}
                    ></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
