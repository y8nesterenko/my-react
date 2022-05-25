// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import {Routes, Route} from "react-router-dom";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import News from "./components/News/News";
import Friends from "./components/Friends/Friends";
import DialogsContainer from "./components/Dialogs/DialogsContainer";


const App = (props) => {

    return (

            <div className='app-wrapper'>
                <Header/>
                <Navbar friends={props.store.getState().messagesPage.dialogs}/>
                <div className="app-wrapper-content">
                    <Routes>
                        <Route path='' element={<Profile store={props.store} />}/>
                        <Route path='/profile' element={<Profile store={props.store}/>}/>
                        <Route path='/dialogs' element={<DialogsContainer store={props.store} />}/>
                        {/*<Route path='/music' element={<Music text="Здесь будет музыка"/>}/>*/}
                        <Route path='/news' element={<News news={props.store.getState().newsPage.news}/>}/>
                        {/*<Route path='/friends' element={<Friends movies={props.state.moviesPage.movies}/>}/>*/}
                        {/*<Route path='/settings' element={<Settings settings={props.state.settingsPage.settings}/>}/>*/}
                    </Routes>
                </div>
            </div>
    );
};

export default App;
