import React from "react";
import style from "./Message.module.css";

const Message = (props) => {
   return (
        <div className={`${style[props.type]}`}>
            <p className={style.text}>{props.message}</p>
        </div>
    );
};

export default Message;