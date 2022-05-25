import reportWebVitals from './reportWebVitals';
import store from './redux/store';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import StoreContext from "./redux/StoreContext";


const root = ReactDOM.createRoot(document.getElementById('root'));

let rerenderEntireTree = () => {
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <StoreContext.Provider value={store}>
                <App />
                </StoreContext.Provider>
            </BrowserRouter>
        </React.StrictMode>
    );
};

rerenderEntireTree();

store.subscribe( () => {
    let state = store.getState();
    rerenderEntireTree();
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
