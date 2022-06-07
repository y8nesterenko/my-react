import React from "react";
import Friends from "./Friends";
import {connect} from "react-redux";
import {
    followActionCreator,
    setCurrentPageAC, setTotalUsersCountAC,
    setUsersActionCreator,
    unfollowActionCreator
} from "../../redux/friends-reducer";

let mapStateToProps = (state) => {
    return {
        //прокидываем через пропсы в компоненту данные из редюсера
        // при изменении state'a connect заново вызывает MSTP, чтобы достать новые, свежие пропсы
        friends: state.friendsPage.friends,
        pageSize: state.friendsPage.pageSize,
        totalFriendsCount: state.friendsPage.totalFriendsCount,
        currentPage: state.friendsPage.currentPage,
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
        setCurrentPage: (pageNumber) => {
          dispatch(setCurrentPageAC(pageNumber))
        },
        setTotalUsersCount: (totalCount) => {
            dispatch(setTotalUsersCountAC(totalCount))
        },
    }
};

const FriendsContainer = connect(mapStateToProps, mapDispatchToProps)(Friends);

export default FriendsContainer;