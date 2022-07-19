import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import { connect } from "react-redux";
import { compose } from "redux";
import withRouter from "./hoc/withRouter";
import { initializeApp } from "./redux/app-reducer";
import Preloader from "./components/common/Preloader";
import Settings from './components/Settings/Settings';
import Theme from './components/Theme/Theme';

const FriendsContainer = React.lazy(() => import("./components/Friends/FriendsContainer"));

class App extends React.Component {

    catchAllUnhandledErrors = (promise) => {
        console.log('some error occured');
        console.log(promise);
    }

    componentDidMount() {
        this.props.initializeApp();
        //отлавливаем все не пойманные ошибки
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        //нужно обязательно убрать eventListener
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }

        return (
            <div className='appWrapper'>
                <HeaderContainer />
                <main>
                    <div className='container'>
                        <Navbar profile={this.props.profile} userId={this.props.userId} login={this.props.login} />

                    <div className='content'>
                    <Routes>
                        {/*через двоеточие в пути обозначаем параметр*/}

                        <Route path='/profile/:userId' element={<ProfileContainer />} />
                        <Route path='/dialogs' element={<DialogsContainer />} />
                        <Route path='/users' element={<React.Suspense fallback={<Preloader />}><FriendsContainer /></React.Suspense>} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/theme' element={<Theme/>} />
                        <Route path='/settings' element={<Settings/>} />
                        <Route exact path='/' element={<Navigate to={`/profile/${this.props.userId}`} />} />
                        <Route exact path='*' element={<div>404 Page not found</div>} />
                    </Routes>
                    </div>
                    </div>
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
    userId: state.auth.userId,
    profile: state.profilePage.profile,
    login: state.auth.login,
});

export default compose(
    withRouter,
    connect(mapStateToProps, { initializeApp })
)(App);