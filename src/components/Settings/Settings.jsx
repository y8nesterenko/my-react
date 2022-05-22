import React from "react";
import style from "./Settings.module.css";

const Settings = (props) => {

    let settingsElements = props.settings.map(
        (settingsData) => {
            return (
                <span>{settingsData.property}
                </span>
            )
        }
    )

    return (
        <span className={style.settings}>
            {settingsElements}
        </span>
    );
}

export default Settings;