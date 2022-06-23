import React from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) {
                return <Navigate to={'/login'}/>
            }
            return <Component {...this.props}/>
        }
    }

    //снабжаем hoc нужными пропсами через connect
    let mapStateToProps = (state) => ({
        isAuth: state.auth.isAuth,
    });

    let ConnectedRedirectComponent = connect(mapStateToProps)(RedirectComponent);

    return ConnectedRedirectComponent;
};