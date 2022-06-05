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
import FriendsContainer from "./components/Friends/FriendsContainer";


const App = (props) => {

    return (

            <div className='app-wrapper'>
                <Header/>
                <Navbar />
                <div className="app-wrapper-content">
                    <Routes>
                        <Route path='' element={<Profile />}/>
                        <Route path='/profile' element={<Profile />}/>
                        <Route path='/dialogs' element={<DialogsContainer />}/>
                        <Route path='/friends' element={<FriendsContainer/>}/>
                        {/*<Route path='/music' element={<Music text="Здесь будет музыка"/>}/>*/}
                        {/*<Route path='/news' element={<News news={props.store.getState().newsPage.news}/>}/>*/}
                        {/*<Route path='/settings' element={<Settings settings={props.state.settingsPage.settings}/>}/>*/}
                    </Routes>
                </div>
            </div>
    );
};

export default App;
