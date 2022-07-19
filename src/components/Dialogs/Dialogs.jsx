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
        <div className='messages'>
            <div className="messagesHeading">
                <h2>Messages</h2>
            </div>

            <div className="searchBar">
                <i className="uil uil-search"></i>
                <input type="search" placeholder="search message" id="messageSearch"/>
            </div>
            <div className="messagesBody">
                <div className="dialogItem">
                    {dialogsElements}
                </div>
                <div className="messagesItems">
                    {messagesElements}
                    <AddMessageForm sendMessage={props.sendMessage}/>
                </div>
            </div>            
        </div>
    );
}

export default Dialogs;