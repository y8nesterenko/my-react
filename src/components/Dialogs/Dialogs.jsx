import React from "react";
import style from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Navigate} from "react-router-dom";
import {Formik} from "formik";

const AddMessageForm = (props) => {
    return (
        <Formik
            initialValues={{newMessageBody: ''}}
            onSubmit={(values) => {
                props.sendMessage(values.newMessageBody);
                //console.log(JSON.stringify(values, null, 2));
            }}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="textarea"
                            name="newMessageBody"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.newMessageBody}
                            placeholder='Enter your messsage'
                        />
                        {errors.newMessageBody && touched.newMessageBody && errors.newMessageBody}
                    </div>
                    <button type="submit"
                            //disabled={isSubmitting}
                    >
                        Send message
                    </button>
                </form>
            )}
        </Formik>
    )
};

const Dialogs = (props) => {

    let state = props.messagesPage;

    let dialogsElements = state.dialogs.map(
        (dialog) => <DialogItem id={dialog.id} key={dialog.id} name={dialog.name} avatar={dialog.avatar} /> );

    let messagesElements = state.messages.map(
        (message) => <Message message={message.message} key={message.id} type={message.type}/> );

    /*
    let addText = () => {
        props.addText();
    };
     */

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