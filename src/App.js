import React from 'react';
import './App.css';
import {Routes, Route} from "react-router-dom";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import News from "./components/News/News";
import Navbar from './components/Navbar/Navbar';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import FriendsContainer from "./components/Friends/FriendsContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import withRouter from "./hoc/withRouter";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader";


class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Routes>
                        {/*<Route path='' element={<ProfileContainer />}/>*/}

                        {/*через двоеточие в пути обозначаем параметр*/}
                        <Route path='/profile/:userId' element={<ProfileContainer/>}/>
                        <Route path='/dialogs' element={<DialogsContainer/>}/>
                        <Route path='/friends' element={<FriendsContainer/>}/>
                        <Route path='/login' element={<Login/>}/>
                        {/*<Route path='/music' element={<Music text="Здесь будет музыка"/>}/>*/}
                        {/*<Route path='/news' element={<News news={props.store.getState().newsPage.news}/>}/>*/}
                        {/*<Route path='/settings' element={<Settings settings={props.state.settingsPage.settings}/>}/>*/}
                    </Routes>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
});

export default compose(
    withRouter,
    connect(mapStateToProps, {initializeApp})
)(App);