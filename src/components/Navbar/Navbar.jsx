import React from "react";
import style from "./Navbar.module.css";
import {NavLink} from "react-router-dom";

const Navbar = (props) => {

    // let friendsElements = props.friends.map(
    //     (friendsData) => {
    //         return (
    //             <div>{friendsData.name}
    //             <img src={friendsData.avatar}/>
    //             </div>
    //         )
    //     }
    // )

    return (
        <nav className={style.nav}>
            <NavLink to='/profile'
                     className={navData => navData.isActive ? style.active : style.item}>Profile
            </NavLink>
            <NavLink to='/dialogs'
                     className={navData => navData.isActive ? style.active : style.item}>Messages
            </NavLink>
            <NavLink to='/news'
                     className={navData => navData.isActive ? style.active : style.item}>News
            </NavLink>
            <NavLink to='/music'
                     className={navData => navData.isActive ? style.active : style.item}>Music
            </NavLink>

            <br/>
            <NavLink to='/settings'
                     className={navData => navData.isActive ? style.active : style.item}>Settings
            </NavLink>

                <br/>
            {/*<NavLink to='/friends'*/}
            {/*         className={navData => navData.isActive ? style.active : style.item}>*/}
            {/*    Friends*/}
            {/*    <div>{friendsElements}</div>*/}
            {/*</NavLink>*/}
        </nav>
    );
}

export default Navbar;