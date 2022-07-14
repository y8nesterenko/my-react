import React from "react";
import style from "./Navbar.module.css";
import {NavLink} from "react-router-dom";

const Navbar = (props) => {

    return (
        <nav className={style.nav}>
            <NavLink to={`/profile/${props.userId}`}
                     className={navData => navData.isActive ? style.active : style.item}>My Profile
            </NavLink>
            <NavLink to='/dialogs'
                     className={navData => navData.isActive ? style.active : style.item}>Messages
            </NavLink>
            <NavLink to='/users' className={navData => navData.isActive ? style.active : style.item}>
                Users
            </NavLink>


        </nav>
    );
}

export default Navbar;