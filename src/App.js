// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from "./components/Dialogs/Dialogs";
import {Routes, Route} from "react-router-dom";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import News from "./components/News/News";
import Friends from "./components/Friends/Friends";


const App = (props) => {

    return (

            <div className='app-wrapper'>
                <Header/>
                <Navbar friends={props.state.messagesPage.dialogs}/>
                <div className="app-wrapper-content">
                    <Routes>
                        <Route path='' element={<Profile profilePage={props.state.profilePage}
                                                         dispatch={props.dispatch} />}/>
                        <Route path='/profile' element={<Profile profilePage={props.state.profilePage}
                                                                 dispatch={props.dispatch}/>}/>
                        <Route path='/dialogs' element={<Dialogs
                            messagesPage={props.state.messagesPage}
                            dispatch={props.dispatch} />}/>
                        <Route path='/music' element={<Music text="Здесь будет музыка"/>}/>
                        <Route path='/news' element={<News news={props.state.newsPage.news}/>}/>
                        <Route path='/friends' element={<Friends movies={props.state.moviesPage.movies}/>}/>
                        <Route path='/settings' element={<Settings settings={props.state.settingsPage.settings}/>}/>
                    </Routes>
                </div>
            </div>
    );
};

export default App;
