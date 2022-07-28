import { profileAPI, usersAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCES = 'profilePage/SAVE_PHOTO_SUCCES';

let initialState = {
    posts: [
        { id: 1, message: "Some chilling in Dubai", img: 'https://klike.net/uploads/posts/2020-01/1580115790_1.jpg', date: 1608427878948, like: 100 },
        { id: 2, message: "Rome weekends", img: 'https://klike.net/uploads/posts/2018-07/1531566244_2.jpg', date: 1618920878948, like: 200 },
        { id: 3, message: "At football game in Barcelona", img: 'https://klike.net/uploads/posts/2020-09/1599300918_18.jpg', date: 1628927818948, like: 300 },
        { id: 4, message: "London is a capital of Great Britain", img: 'https://klike.net/uploads/posts/2020-03/1584522931_8.jpg', date: 1638927878948, like: 400 },
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
                { id: state.posts.length + 1, date: Date.now(), message: action.newPostText, like: 0, },
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

        case SAVE_PHOTO_SUCCES:
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos },
            }
        default:
            return state;
    }
};

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText });
export const deletePost = (postId) => ({ type: DELETE_POST, postId });

//сюда будет приходить профайл, и в экшене будет сидеть сам профайл
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });

const setUserStatus = (status) => ({ type: SET_STATUS, status });
const savePhotoSucces = (photos) => ({ type: SAVE_PHOTO_SUCCES, photos });

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
        .catch(error => {
            console.log(error);
        })
}

export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSucces(response.data.data.photos))
    }
}

export const saveProfile = (profile, setStatus) => async (dispatch, getState) => {
    let response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(getState().auth.userId))
    } else {
        setStatus(response.data.messages[0]);
        return Promise.reject(response.data.messages[0]);
    }
}

export default profileReducer;