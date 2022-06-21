import {usersAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

let initialState = {
    posts: [
        {id: 1, message: "Это мой первый пост", like: 100},
        {id: 2, message: "Это мой второй пост", like: 200},
        {id: 3, message: "Это мой третий пост", like: 300},
        {id: 4, message: "Это мой четвёртый пост", like: 400},
        {id: 5, message: "Это мой пятый пост", like: 500},
        {id: 6, message: "Это мой шестой пост", like: 600},
        {id: 7, message: "Это мой седьмой пост", like: 700},
        {id: 8, message: "Это мой восьмой пост", like: 800},
    ],
    newPostText: '',
    //изначально у нас профайл не проинициализировался (профиля пока нет)
    profile: null,
};

const profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText,
            };
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts,
                    {id: 5, message: state.newPostText, like: 0,},
                ],
                newPostText: '',
            };
        case SET_USER_PROFILE:
            return {
                //сделаем копию стейта и поменяет профайл на профайл, который придёт из экшена
                ...state,
                profile: action.profile,
            };

        default:
            return state;
    }
};

export const addNewPostTextActionCreator = (text) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text
    };
};

//аналогична запись другого ActionCreatora с синтаксисом в одну строчку
export const addPostActionCreator = () => ({type: ADD_POST});

//сюда будет приходить профайл, и в экшене будет сидеть сам профайл
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});

export const getUserProfile = (userId) => {
    return (dispatch) => {
        usersAPI.getProfile(userId)
            .then(response => {
                dispatch(setUserProfile(response.data));
            });
    }
}

export default profileReducer;