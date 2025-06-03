import React, { useCallback, useState } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AuthContext } from "./AuthContext";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";


function Managewindow() {

    const { profileInfo, updateAddProfile, updateExistProfile , setProfileInfo} = React.useContext(AuthContext);
    const [isProfile, setIsProfile] = useState(0);
    const [selectedProfile, setSelectedProfile] = useState({profile_id:"",name:"", avatar_url:"blueProfile.jpg", is_kid:false});
    const [addProfile, setAddProfile] = React.useState({profile_id:"",name:"", avatar_url:"blueProfile.jpg", is_kid:false});

    const navigate = useNavigate();

    const updateIsProfile = useCallback((info) => {
        setIsProfile(info)
    }, [])

    const updateSelectedProfile = useCallback((info) => {
        console.log(info)
        setSelectedProfile(info)
        setIsProfile(2)
    }, [])

    const sendAddProfile= ()=>{
        updateAddProfile(addProfile); 
        setAddProfile((old)=>{return{...old, name:""}});
        navigate("/watching")
    }

    const sendUpdateProfile= ()=>{
        console.log(selectedProfile)
        console.log(profileInfo)
        updateExistProfile({...addProfile, profile_id: selectedProfile})
        setProfileInfo((old)=>{return old.map((profile)=>profile.profile_id===selectedProfile?{...profile, ...addProfile}:profile)})
        setAddProfile((old)=>{return{...old, name:""}});
    }
    

    return (
        <div >
            {isProfile===0 ?
                <div className="profile-container">
                    <p className="profile-container-p">Manage Profiles:</p>
                    <div className="profiles">
                        {profileInfo && profileInfo.map((profile) => <Profile key={profile.profile_id} profile_id={profile.profile_id} name={profile.name} avatar_url={profile.avatar_url}  selectProfile={updateSelectedProfile}/>)}
                        {addProfile.name?<Profile name={addProfile.name}/>:
                         <div className="addProfile">
                            <AddCircleIcon sx={{ fontSize: 160 }} className="addIcon" onClick={() => { updateIsProfile(1) }} />
                            <div>Add Profile</div>
                        </div>
                         }

                    </div>
                    <button onClick={()=>{sendAddProfile()}}>Done</button>
                </div> :
                 isProfile===1?<div className="newProfile">
                    <div className="newProfile-container">
                        <div className="para">
                            <p style={{fontSize:"50px"}}>Add Profile</p> 
                            <p style={{fontSize:"18px", color:"grey"}}>Add a profile for another person watching Neflix.</p>
                        </div>
                        <div className="newProfile-img">
                            <img src="blueProfile.jpg" alt="" />
                            <input type="text" className="text-container" onChange={(event)=> setAddProfile((old)=> {return {...old, name:event.target.value}})} required value={addProfile.name}/>
                            <div><input type="checkbox" className="checkbox-container" onChange={() => setAddProfile((old) => ({ ...old, is_kid: !old.is_kid }))  }/></div>
                            <div>Kid?</div>
                        </div>
                        <div className="newProfile-button">
                            <button className="red" onClick={()=>{updateIsProfile(0)}}>Continue</button>
                            <button className="cancel" onClick={()=>{setAddProfile({name:"", is_kid:false}); updateIsProfile(0)}}>Cancel</button>
                        </div>
                    </div>
                </div>:
                <div className="newProfile">
                    <div className="newProfile-container">
                        <div className="para">
                            <p style={{fontSize:"50px"}}>Edit Profile</p> 
                            <p style={{fontSize:"18px", color:"grey"}}>Add a profile for another person watching Neflix.</p>
                        </div>
                        <div className="newProfile-img">
                            <img src="blueProfile.jpg" alt="" />
                            <input type="text" className="text-container" onChange={(event)=> setAddProfile((old)=> {return {...old, name:event.target.value}})} required value={addProfile.name}/>
                            <div><input type="checkbox" className="checkbox-container" onChange={() => setAddProfile((old) => ({ ...old, is_kid: !old.is_kid }))  }/></div>
                            <div>Kid?</div>
                        </div>
                        <div className="newProfile-button">
                            <button className="red" onClick={()=>{ sendUpdateProfile(); updateIsProfile(0);  }}>Continue</button>
                            <button className="cancel" onClick={()=>{setAddProfile({name:"", is_kid:false}); updateIsProfile(0)}}>Cancel</button>
                        </div>
                    </div>
                </div>
                }
        </div>
    )
}

export default Managewindow;
