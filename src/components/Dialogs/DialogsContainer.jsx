import React from "react";
import {addMessageActionCreator, addNewMessageTextActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../redux/StoreContext";

const DialogsContainer = (props) => {

       return (
        <StoreContext.Consumer>{
            (store) => {
                let addText = () => {
                    store.dispatch(addMessageActionCreator());
                };
                let onMessageChange = (text) => {
                    store.dispatch(addNewMessageTextActionCreator(text));
                };
            return <Dialogs onMessageChange={onMessageChange}
                     addText={addText}
                     messagesPage={store.getState().messagesPage}/>
            }
            }
        </StoreContext.Consumer>
    );
}

export default DialogsContainer;