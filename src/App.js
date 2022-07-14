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
            <div className='app-wrapper'>
                <HeaderContainer />
                <Navbar userId={this.props.userId} />
                <div className="app-wrapper-content">
                    <Routes >

                        {/*через двоеточие в пути обозначаем параметр*/}
                        <Route path='/profile/:userId' element={<ProfileContainer />} />
                        <Route path='/dialogs' element={<DialogsContainer />} />
                        <Route path='/users' element={<React.Suspense fallback={<Preloader />}><FriendsContainer /></React.Suspense>} />
                        <Route path='/login' element={<Login />} />
                        <Route exact path='/' element={<Navigate to={`/profile/${this.props.userId}`} />} />
                        <Route exact path='*' element={<div>404 Page not found</div>} />
                    </Routes>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
    userId: state.auth.userId,
});

export default compose(
    withRouter,
    connect(mapStateToProps, { initializeApp })
)(App);