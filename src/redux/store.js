import {applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from 'redux';
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import newsReducer from "./news-reducer";
import friendsReducer from "./friends-reducer";
import authReducer from "./auth-reducer";
//из redux-thunk импорт по дефолту. Можем называть thunkMiddleware как угодно
import thunkMiddleware from "redux-thunk";
import appReducer from "./app-reducer";


const reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    newsPage: newsReducer,
    friendsPage: friendsReducer,
    auth: authReducer,
    app: appReducer,
});
//создаём наш стор и отдаём ему наши редюсеры
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

/* store with reduxDevTools
const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnchancers(applyMiddleware(thunkMiddleware)));
 */

export default store;