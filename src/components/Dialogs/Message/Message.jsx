import React from "react";
import style from "./Message.module.css";

const Message = (props) => {
   return (
        <div className={`message ${style[props.type]}`}>
            {props.message}
        </div>
    );
};

export default Message;