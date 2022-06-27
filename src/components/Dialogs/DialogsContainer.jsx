import React from "react";
import {sendMessage} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state) => {
    return {
        messagesPage: state.messagesPage,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageBody) => {
            dispatch(sendMessage(newMessageBody));
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
