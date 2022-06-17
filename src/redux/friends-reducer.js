const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    friends: [

    ],
    //лучше не использовать размер порции ответа с сервера по умолчанию, потому что он может меняться. Поэтому его нужно зафиксировать самостоятельно
    pageSize: 5,
    totalFriendsCount: 0,
    currentPage: 1,
    //значение, говорящее идёт ли запрос данных на сервере
    isFetching: false,
    //значение чтобы дисейблить кнопку добавления в друзья при первом её нажатии
    followingInProgress: [],
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
                //не добавляем юзеров, которые пришли из экшена в конец массива, а перезаписываем уже имеющийся массив
                friends: action.friends
            };

            //меняем значение текущей страницы (currentPage). Номер страницы приходит из экшена
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage,
            };

        case SET_TOTAL_USERS_COUNT:
            return {
                //делаем копию state'а и подменяем то свойство, которое нужно подменить
                ...state,
                totalFriendsCount: action.count,
            };

        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            };

        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    //делаем копию массива фильтруем ненужного пользователя (т.е. пропускаем ту айдишку, которая не равна айдишки, которая пришла из екшена
                    : state.followingInProgress.filter(id => id !== action.userId)
            };

        default:
            return state;
    }
};
export const follow = (userId) => ({type: FOLLOW, userId});
//ActionCreator создаётся вместо отдельного объекта action:
// let action = { type: 'UPDATE-NEW-MESSAGE-TEXT', newMessage: text};
export const unfollow = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (friends) => ({type: SET_USERS, friends});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingProgress = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId});


export default friendsReducer;