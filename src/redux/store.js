import {combineReducers, legacy_createStore as createStore} from 'redux';
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import newsReducer from "./news-reducer";
import friendsReducer from "./friends-reducer";
import authReducer from "./auth-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    newsPage: newsReducer,
    friendsPage: friendsReducer,
    auth: authReducer,
});
//создаём наш стор и отдаём ему наши редюсеры
let store = createStore(reducers);

export default store;