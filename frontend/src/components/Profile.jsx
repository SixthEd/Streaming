import React, { useState } from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

function Profile(props) {

    const selectingProfile=()=>{
        // console.log(props.profile_id)
        props.selectProfile(props.profile_id)
    }

    return (
        <div className="window-container">
            <li className="profile-contentls" onClick={()=>{selectingProfile()}}>
                <div id="images">

                    <img src="blueProfile.jpg" alt="" />
                    <EditOutlinedIcon className="editIcon" sx={{fontSize:50}}/>
                </div>
            </li>
           <div id="name">{props.name}</div>

        </div>
    );
}
export default Profile;