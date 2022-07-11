import React from 'react';
import './App.css';
import {Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import withRouter from "./hoc/withRouter";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader";

const FriendsContainer = React.lazy(() => import ("./components/Friends/FriendsContainer"));

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

                        {/*через двоеточие в пути обозначаем параметр*/}
                        <Route path='/profile/:userId' element={<ProfileContainer/>}/>
                        <Route path='/dialogs' element={<DialogsContainer/>}/>
                        <Route path='/users' element={<React.Suspense fallback={<Preloader/>}><FriendsContainer/></React.Suspense>}/>
                        <Route path='/login' element={<Login/>}/>
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