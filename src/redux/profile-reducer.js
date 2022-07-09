import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
    posts: [
        {id: 1, message: "Это мой первый пост", like: 100},
        {id: 2, message: "Это мой второй пост", like: 200},
        {id: 3, message: "Это мой третий пост", like: 300},
        {id: 4, message: "Это мой четвёртый пост", like: 400},
    ],
    newPostText: '',
    //изначально у нас профайл не проинициализировался (профиля пока нет)
    profile: null,
    status: '',
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts,
                    {id: 5, message: action.newPostText, like: 22,},
                ],
                newPostText: '',
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.postId)
           };
        case SET_USER_PROFILE:
            return {
                //сделаем копию стейта и поменяет профайл на профайл, который придёт из экшена
                ...state,
                profile: action.profile,
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status,
            }
        default:
            return state;
    }
};

export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText});
export const deletePost = (postId) => ({type: DELETE_POST, postId});

//сюда будет приходить профайл, и в экшене будет сидеть сам профайл
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});

const setUserStatus = (status) => ({type: SET_STATUS, status});

export const getUserProfile = (userId) => {
    return (dispatch) => {
        usersAPI.getProfile(userId)
            .then(response => {
                dispatch(setUserProfile(response.data));
            });
    }
};

export const getUserStatus = (userId) => (dispatch) => {
    profileAPI.getStatus(userId)
        .then(response => {
            dispatch(setUserStatus(response.data))
        })
};

export const updateUserStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status)
        .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setUserStatus(status))
                }
            }
        )
}

export default profileReducer;