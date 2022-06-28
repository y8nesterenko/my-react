import React from "react";
import style from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Navigate} from "react-router-dom";
import {AddMessageForm} from "./AddMessageForm";

const Dialogs = (props) => {

    let state = props.messagesPage;
    let dialogsElements = state.dialogs.map(
        (dialog) => <DialogItem id={dialog.id} key={dialog.id} name={dialog.name} avatar={dialog.avatar} /> );
    let messagesElements = state.messages.map(
        (message) => <Message message={message.message} key={message.id} type={message.type}/> );

    if (!props.isAuth) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={style.dialogs}>
            <div className={style.dialogs__items}>
                {dialogsElements}
            </div>
            <div className={style.messages}>
                {messagesElements}
            </div>
            <AddMessageForm sendMessage={props.sendMessage}/>
        </div>
    );
}

export default Dialogs;