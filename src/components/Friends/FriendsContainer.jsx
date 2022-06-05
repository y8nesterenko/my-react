import React from "react";
import Friends from "./Friends";
import {connect} from "react-redux";
import {followActionCreator, setUsersActionCreator, unfollowActionCreator} from "../../redux/friends-reducer";

let mapStateToProps = (state) => {
    return {
        friends: state.friendsPage.friends,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
        dispatch(followActionCreator(userId))
        },
        unfollow: (userId) => {
            dispatch(unfollowActionCreator(userId))
        },
        setUsers: (friends) => {
            dispatch(setUsersActionCreator(friends))
        },
    }
};

const FriendsContainer = connect(mapStateToProps, mapDispatchToProps)(Friends);

export default FriendsContainer;