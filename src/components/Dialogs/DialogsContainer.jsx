import React from "react";
import {addMessageActionCreator, addNewMessageTextActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";

const DialogsContainer = (props) => {

      let addText = () => {
        props.store.dispatch(addMessageActionCreator());
    };

    let onMessageChange = (text) => {
        props.store.dispatch(addNewMessageTextActionCreator(text));
    };

    return (
       <Dialogs onMessageChange={onMessageChange} addText={addText} messagesPage={props.store.getState().messagesPage}/>
    );
}

export default DialogsContainer;