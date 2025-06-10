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
    const [selectedMovie, setSelectedMovie] = React.useState({});
    const [searchMovie, setSearchMovie] = React.useState("");
    const [registerErrorMessage, setRegisterErrorMessage] = React.useState("");
    const [loginErrorMessage, setLoginErrorMessage] = React.useState("");



    const [loadingProfiles, setLoadingProfiles] = React.useState(true);
    const [myList, setMyList] = React.useState([]);

    const updateSearchMovie = React.useCallback((info)=>{
        setSearchMovie(info)
    },[])

    const updateSelectedUser = React.useCallback((info)=>{
        console.log(profileInfo)
        console.log(info)
        setSelectedUser(info);
        localStorage.setItem("selectedUser", JSON.stringify(info)) 
    },[profileInfo])


    const updateMyList = useCallback(async(info)=>{
        setMyList((old)=>[...old,info]);
        axiosInstance.post("/addmovie",info).then((response)=>{console.log(response.data)}).catch((err)=>{console.log(err)});
    },[])


    const updateAddProfile = React.useCallback((info)=>{
        info.profile_id = uuidv4();
        console.log(info);
      info.name && profileInfo.length<4 && setProfileInfo((old)=>{return [...old,info]});
       profileInfo.length<4 && addProfiles(info)
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
            setLoginErrorMessage(error.response.data)
        })

        getProfiles()

    }, [loginInfo, user]); // Add loginInfo and user as dependencies

    const sendRegisterInfo = useCallback(() => {
        console.log(registerInfo.email)
        axiosInstance.post("/register", {
            email: registerInfo.email,
            name: registerInfo.name,
            password: registerInfo.password,
            confirmPassword: registerInfo.confirmPassword
        }).then((response) => { setUser(response.data); localStorage.setItem("user", JSON.stringify(response.data)) }).catch((error) => {
            console.log(error);
            setRegisterErrorMessage(error.response.data)
        })


    }, [registerInfo, user]); 

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


    const getProfiles = async() => {
        setLoadingProfiles(true)
        await axiosInstance.get("/showManageProfile", {
            params: { email: "pragyan@gmail.com" }
        }).then((response) => {
            setProfileInfo(response.data);
            console.log(response.data);
            setLoadingProfiles(false);
        }).catch((error) => {
            console.log(error);
        });
    }

    const addProfiles = useCallback(async(info) => {
        await axiosInstance.post("/showManageProfile/add", {
            email: user.email, ...info
        }).then((response) => {
            setProfileInfo((old)=>[...old,response.data]);
        }).catch((error) => {
            console.log(error);
        });
    })

    return (
        <AuthContext.Provider value={{registerErrorMessage, loginErrorMessage, sendRegisterInfo, loadingProfiles, loginInfo, updateLoginInfo, sendLoginInfo, registerInfo, updateRegisterInfo, user, profileInfo, updateAddProfile, updateExistProfile, setProfileInfo, updateSelectedUser, selectedUser, setSelectedUser , setSelectedMovie, selectedMovie, setSelectedMovie, updateMyList, myList, updateSearchMovie, searchMovie}} >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthContextProvider };