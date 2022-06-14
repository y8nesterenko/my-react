import React from "react";
import style from "./Profile.module.css";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {

    return (
        <main className={style.content}>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer />
        </main>
    );
}

export default Profile;