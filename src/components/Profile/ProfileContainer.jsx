import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile} from "../../redux/profile-reducer";
import {Navigate, useLocation, useNavigate, useParams} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


class ProfileContainer extends React.Component {

    componentDidMount() {
        //берём из параметров URL Id пользователя
        let userId = this.props.router.params.userId;

        //если в параметрах нет userId, тогда он равен 2
        if (!userId) {
            userId = 2;
        }

        //делаем get-запрос профиля пользователя по Id пользователя
        this.props.getUserProfile(userId);
    };

    render() {

        return (
            //прокидываем в компоненту полученные пропсы. + помимо тех пропсов, что в меня пришли, на тебе ещё профайл
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
};
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

let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

//круглые скобки перед фигурными скобками значит, что возвращается объект, а не тело функции
let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    //прокидывать isAuth уже не нужно, это делает hoc
    //isAuth: state.auth.isAuth,
});

// wrapper to use react router's v6 hooks in class component(to use HOC pattern, like in router v5)
function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }
    return ComponentWithRouterProp;
}

export default connect(mapStateToProps, {getUserProfile})(withRouter(AuthRedirectComponent));