import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import newsReducer from "./news-reducer";
import friendsReducer from "./friends-reducer";
import authReducer from "./auth-reducer";
//из redux-thunk импорт по дефолту. Можем называть thunkMiddleware как угодно
import thunkMiddleware from "redux-thunk";


let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    newsPage: newsReducer,
    friendsPage: friendsReducer,
    auth: authReducer,
});
//создаём наш стор и отдаём ему наши редюсеры
let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;