import React from "react";
import style from "./DialogItem.module.css";
import { NavLink } from "react-router-dom";

const DialogItem = (props) => {
  let path = "/dialogs/" + props.id;
  return (
    <div className="dialogItemElement">
        <img className="profilePicture" src={props.avatar} />
        <NavLink to={path} className={(navData) => navData.isActive ? "messageReceiver active" : "messageReceiver"}>
          {props.name}
        </NavLink>
    </div>
  );
};
export default DialogItem;
