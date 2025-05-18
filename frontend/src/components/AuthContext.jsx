import { createContext } from "react";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
    // const [registerInfo, setRegisterInfo] = useEffect({
    //     email: "",
    //     name: "",
    //     password: "",
    //     confirmPassword: "",
    // });

    // const [loginInfo, setLoginInfo] = useEffect({ email: "", password: "" });
    //
    //
    let registerInfo = {
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
    };

    let loginInfo = {
        email: "",
        password: "",
    };

    return (
        <AuthContext.Provider
            value={{
                registerInfo,
                loginInfo,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
export { AuthContext };
