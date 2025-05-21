import React, { useCallback, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import WatchingProfiles from "./WatchingProfiles";
import { useNavigate } from "react-router-dom";
import Browser from "./Browser";

function Watching() {

    const navigate = useNavigate();
    const { profileInfo , selectedUser } = React.useContext(AuthContext);

    const goManageWindow = () => {
        navigate("/manageProfile")
    }


  

    return (
        <div >
            {selectedUser?<Browser key={selectedUser.profile_id} profile_id={selectedUser.profile_id} name={selectedUser.name} avatar_url={selectedUser.avatar_url} is_kid={selectedUser.is_kid}/>:
                <div className="watching-container">
                    <h1>Who's Watching?</h1>
                    <div className="watching-profiles">
                        {profileInfo && profileInfo.map((profile) => <WatchingProfiles key={profile.profile_id} profile_id={profile.profile_id} name={profile.name} avatar_url={profile.avatar_url} is_kid={profile.is_kid}/>)}
                    </div>
                    <button onClick={() => { goManageWindow()}}>Manage Profile</button>
                </div>
            }
        </div>
    )
}

export default Watching