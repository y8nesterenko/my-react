import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, getUserStatus, updateUserStatus} from "../../redux/profile-reducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import withRouter from "../../hoc/withRouter";


class ProfileContainer extends React.Component {

    componentDidMount() {
        //берём из параметров URL Id пользователя
        let userId = this.props.router.params.userId;

        //если в параметрах нет userId, тогда он равен 2
        if (!userId) {
            userId = 24606;
        }

        //делаем get-запрос профиля пользователя по Id пользователя
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    };

    render() {
        return (
            //прокидываем в компоненту полученные пропсы. + помимо тех пропсов, что в меня пришли, на тебе ещё профайл
            <Profile {...this.props}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateUserStatus={this.props.updateUserStatus} />
        )
    }
};

//круглые скобки перед фигурными скобками значит, что возвращается объект, а не тело функции
let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    //прокидывать isAuth уже не нужно, это делает hoc
    //isAuth: state.auth.isAuth,
});

/* hoc до рефакторинга (переноса в отдельный файл)
let AuthRedirectComponent = (props) => {
    if (!props.isAuth) {
        return <Navigate to={'/login'}/>
    }
    return <ProfileContainer {...props} />
};

//прописываем пропсы для редиректа
let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth,
});

//снабжаем hoc нужными пропсами
AuthRedirectComponent = connect(mapStateToPropsForRedirect)(AuthRedirectComponent);
*/

/* Заменяем эти записи на compose
let AuthRedirectComponent = withAuthRedirect(ProfileContainer);
export default connect(mapStateToProps, {getUserProfile})(withRouter(AuthRedirectComponent));
 */

export default compose(
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus}),
    withRouter,
    withAuthRedirect,
)(ProfileContainer);