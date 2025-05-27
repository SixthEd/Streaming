import React, { use } from "react";
import { createContext } from "react";
import axiosInstance from "../utils";
import { useCallback } from "react";
import { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [loginInfo, setLoginInfo] = React.useState({ email: "", password: "" });
    const [registerInfo, setRegisterInfo] = React.useState({ email: "", name: "", password: "", confirmPassword: "" });
    const [profileInfo, setProfileInfo] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [selectedUser, setSelectedUser] = React.useState(null);
    const updateSelectedUser = React.useCallback((info)=>{
        console.log(profileInfo)
        console.log(info)
        setSelectedUser(info);
    },[profileInfo])



    const updateAddProfile = React.useCallback((info)=>{
        info.profile_id = uuidv4();
        console.log(info);
      info.name && setProfileInfo((old)=>{return [...old,info]});
      addProfiles(info)
    },[profileInfo]);

    const updateExistProfile = React.useCallback((info)=>{
        axiosInstance.put("/showManageProfile/update",info).then((response)=>{console.log(response.data)}).catch((error)=>{
            console.log(error);
        })
    })

    const updateRegisterInfo = React.useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    const updateLoginInfo = React.useCallback((info) => {
        setLoginInfo(info);
    }, []);


    const sendLoginInfo = useCallback(() => {
        axiosInstance.post("/login", {
            email: loginInfo.email,
            password: loginInfo.password
        }).then((response) => { setUser(response.data); localStorage.setItem("user", JSON.stringify(response.data)) }).catch((error) => {
            console.log(error);
        })

        getProfiles()

    }, [loginInfo, user]); // Add loginInfo and user as dependencies

    useEffect(() => {

        if (localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem("user")));
            getProfiles()
        }
        else
        {
            setUser(null);
            setSelectedUser(null);
        }
    }, [])

    const getProfiles = () => {
        axiosInstance.get("/showManageProfile", {
            params: { email: "pragyan@gmail.com" }
        }).then((response) => {
            setProfileInfo(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    const addProfiles = useCallback((info) => {
        axiosInstance.post("/showManageProfile/add", {
            email: user.email, ...info
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    })

    return (
        <AuthContext.Provider value={{ loginInfo, updateLoginInfo, sendLoginInfo, registerInfo, updateRegisterInfo, user, profileInfo, updateAddProfile, updateExistProfile, setProfileInfo, updateSelectedUser, selectedUser}} >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthContextProvider };