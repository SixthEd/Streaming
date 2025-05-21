import "./App.css";
import Home from "./components/Home.jsx";
import { BrowserRouter, Routes, Route , Navigate} from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import { useContext } from "react";
import { AuthContext } from "./components/AuthContext.jsx";
import Watching from "./components/Watching.jsx";
import Managewindow from "./components/Managewindow.jsx";
import Browser from "./components/Browser.jsx";

function App() {
    const { user, selectedUser} = useContext(AuthContext);

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={user && selectedUser? <Navigate to="/browser"></Navigate>: user?<Navigate to="/watching"></Navigate>:<Home />}
                    ></Route>
                    <Route
                        path="/login"
                        element={user && selectedUser? <Navigate to="/browser"></Navigate>: user?<Navigate to="/watching"></Navigate>: <Login />}
                    ></Route>
                    <Route
                        path="/signin"
                        element={user && selectedUser? <Navigate to="/browser"></Navigate>: user?<Navigate to="/watching"></Navigate>: <Signup />}
                    ></Route>
                    <Route
                        path="/manageProfile"
                        element={<Managewindow />}
                    ></Route>
                    <Route
                        path="/watching"
                        element={user && selectedUser?<Navigate to="/browser"></Navigate>:user?<Watching />:<Navigate to="/login">  </Navigate>}
                    ></Route>
                    <Route
                        path="/browser"
                        element={user && selectedUser ?<Browser />: user? <Navigate to="/watching"></Navigate>:<Navigate to="/login"></Navigate> }>
                    </Route>
                
                    
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
