import React from "react";
import style from "./Profile.module.css";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {

    return (
        <main className={style.content}>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateUserStatus={props.updateUserStatus}
            />
            <MyPostsContainer />
        </main>
    );
}

export default Profile;