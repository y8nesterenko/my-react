import React, { useEffect } from "react";
import style from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import userPhoto from "../../assets/images/user.png";
import Preloader from "../common/Preloader.jsx";

const Navbar = (props) => {
  if (!props.profile) {
    return <EmptyNavbar/>
}

  return (
    <nav className="navbar">
      <a className="profile">
        <div className="profilePicture">
          <img src={props.profile.photos.large != null
                ? props.profile.photos.small
                : userPhoto } />
        </div>
        <div className="handle">
          <h4>{props.login}</h4>
          <p className="textMuted">{props.profile.fullName}</p>
        </div>
      </a>

      {/* SIDEBAR */}
      <div className="sidebar">

          <NavLink to={`/profile/${props.userId}`} className={navData => navData.isActive ? style.menuItem + ' ' + style.active : style.menuItem}>
              <span><i className="uil uil-home"></i></span><h3>Home</h3>
          </NavLink>

          <NavLink to="/dialogs" id='messagesNotification' className={navData => navData.isActive ? style.active : style.menuItem}>
             <span><i className="uil uil-envelope-alt"><small className="notificationCount">3</small></i></span><h3>Messages</h3>
          </NavLink>

          <NavLink to="/users" className={navData => navData.isActive ? style.active : style.menuItem}>
              <span><i className="uil uil-user"></i></span><h3>Users</h3>
          </NavLink>

          <NavLink to="/theme" className={navData => navData.isActive ? style.active : style.menuItem}>
              <span><i className="uil uil-palette"></i></span><h3>Theme</h3>
          </NavLink>

          <NavLink to="/settings" className={navData => navData.isActive ? style.active : style.menuItem}>
              <span><i className="uil uil-setting"></i></span><h3>Settings</h3>
          </NavLink>
      </div>

    </nav>
  );
};

const EmptyNavbar = () => {
  return (
    <nav className="navbar">

      {/* SIDEBAR */}
      <div className="sidebar">

          <NavLink to="/users" className={navData => navData.isActive ? style.active : style.menuItem}>
              <span><i className="uil uil-user"></i></span><h3>Users</h3>
          </NavLink>

          <NavLink to="/theme" className={navData => navData.isActive ? style.active : style.menuItem}>
              <span><i className="uil uil-palette"></i></span><h3>Theme</h3>
          </NavLink>

          <NavLink to="/settings" className={navData => navData.isActive ? style.active : style.menuItem}>
              <span><i className="uil uil-setting"></i></span><h3>Settings</h3>
          </NavLink>
      </div>

    </nav>

  )
}

export default Navbar;
