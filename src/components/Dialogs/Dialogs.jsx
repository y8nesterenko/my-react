import React from "react";
import style from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {addMessageActionCreator, addNewMessageTextActionCreator, addNewPostTextActionCreator} from "../../redux/state";

const Dialogs = (props) => {

    let dialogsElements = props.messagesPage.dialogs.map(
        (dialog) => <DialogItem id={dialog.id} name={dialog.name} avatar={dialog.avatar} /> );

    let messagesElements = props.messagesPage.messages.map(
        (message) => <Message message={message.message} type={message.type}/> );

    let textEl = React.createRef();

    let addText = () => {
        props.dispatch(addMessageActionCreator());
    };

    let onMessageChange = () => {
        let text = textEl.current.value;
        props.dispatch(addNewMessageTextActionCreator(text));
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
                ref={textEl}
            placeholder='Веедите текст нового сообщения'/>
                <button onClick={addText}>Отправить</button>
            </div>
        </div>
    );
}

export default Dialogs;