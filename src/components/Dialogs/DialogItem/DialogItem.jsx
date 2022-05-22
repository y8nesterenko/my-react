import React from "react";
import style from "./DialogItem.module.css";
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    let path = "/dialogs/" + props.id;
    return (
        <div className={style.user}>
    <img src={props.avatar} />
        <NavLink to={path} className={navData => navData.isActive ? style.active : style.dialog}>
            {props.name}</NavLink>
        </div>
    );
}
export default DialogItem;