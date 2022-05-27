import React from "react";
import style from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {

    let state = props.messagesPage;

    let dialogsElements = state.dialogs.map(
        (dialog) => <DialogItem id={dialog.id} key={dialog.id} name={dialog.name} avatar={dialog.avatar} /> );

    let messagesElements = state.messages.map(
        (message) => <Message message={message.message} key={message.id} type={message.type}/> );

    let addText = () => {
        props.addText();
    };

    let onMessageChange = (e) => {
        props.onMessageChange(e.target.value);
    };

    return (

        <div className={style.dialogs}>
            <div className={style.dialogs__items}>
                {dialogsElements}
            </div>
            <div className={style.messages}>
                {messagesElements}
            </div>
            <div>
            <textarea onChange={onMessageChange}
                      value={props.messagesPage.newMessageText}
            placeholder='Веедите текст нового сообщения'/>
                <button onClick={addText}>Отправить</button>
            </div>
        </div>
    );
}

export default Dialogs;