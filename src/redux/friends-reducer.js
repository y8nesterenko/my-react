const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';

let initialState = {
    friends: [

    ],
};

const friendsReducer = (state = initialState, action) => {
    switch (action.type) {

        case FOLLOW:
            return {
                ...state,
                friends: state.friends.map(user => {
                    //если юзерИД пользователя равен тому, который получаем из экшена
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    }
                    return user;
                })
            };

        case UNFOLLOW:
            return {
                ...state,
                friends: state.friends.map(user => {
                    //если юзерИД пользователя равен тому, который получаем из экшена
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user;
                })
            };

        case SET_USERS:
            //копируем старый стейт, массив друзей в нём, и добавляем туда друзей, которые прийдут из экшена
            return {
                ...state,
                friends: [...state.friends, ...action.friends]
            };

        default:
            return state;
    }
};
export const followActionCreator = (userId) => ({type: FOLLOW, userId});
//ActionCreator создаётся вместо отдельного объекта action:
// let action = { type: 'UPDATE-NEW-MESSAGE-TEXT', newMessage: text};
export const unfollowActionCreator = (userId) => ({type: UNFOLLOW, userId});
export const setUsersActionCreator = (friends) => ({type: SET_USERS, friends});


export default friendsReducer;