import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

function WatchingProfiles(props) {
    const {updateSelectedUser} = useContext(AuthContext);

    const selectingUser =()=>{
        updateSelectedUser({profile_id: props.profile_id, is_kid : props.is_kid, name: props.name, avatar_url: props.avatar_url})
    }
    return (
        <div className="window-container">
            <li className="profile-contentls" onClick={()=>{selectingUser()}}>
                <div id="images">
                    <img src="blueProfile.jpg" alt="" />
                </div>
            </li>
           <div id="name">{props.name}</div>

        </div>
    );
}
export default WatchingProfiles;