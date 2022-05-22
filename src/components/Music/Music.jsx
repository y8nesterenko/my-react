import React from "react";
import style from "./Music.module.css";

const Music = (props) => {
    return (
        <div className={style.music}>
            Музыка { props.text }
        </div>
    );
}

export default Music;