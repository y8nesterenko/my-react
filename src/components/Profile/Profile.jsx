import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import style from "./Profile.module.css";
import ProfileInfo from "../ProfileInfo/ProfileInfo";

const Profile = (props) => {

    return (
        <main className={style.content}>
            <ProfileInfo/>
            <MyPosts posts={props.profilePage.posts}
                     newPostText={props.profilePage.newPostText}
                     dispatch={props.dispatch} />
        </main>
    );
}

export default Profile;