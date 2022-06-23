import React from "react";
import {addMessageActionCreator, addNewMessageTextActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state) => {
    return {
        messagesPage: state.messagesPage,
        //прокидывать isAuth уже не нужно, это делает hoc
        //isAuth: state.auth.isAuth,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        addText: () => {
            dispatch(addMessageActionCreator());
        },
        onMessageChange: (text) => {
            dispatch(addNewMessageTextActionCreator(text))
        },
    }
};
/* hoc до рефакторинга (переноса в отдельный файл)
let AuthRedirectComponent = (props) => {
    if (!props.isAuth) {
        return <Navigate to={'/login'}/>
    }
    return <Dialogs {...props} />
};

//прописываем пропсы для редиректа
let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth,
});

//снабжаем hoc нужными пропсами
AuthRedirectComponent = connect(mapStateToPropsForRedirect)(AuthRedirectComponent);
*/

/* Заменяем эти записи на compose
let AuthRedirectComponent = withAuthRedirect(Dialogs);
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);
export default DialogsContainer;
*/

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);
