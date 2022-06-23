import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile} from "../../redux/profile-reducer";
import {Navigate, useLocation, useNavigate, useParams} from "react-router-dom";


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

        if (!this.props.isAuth) {
            return <Navigate to={'/login'}/>
        }

        return (
            //прокидываем в компоненту полученные пропсы. + помимо тех пропсов, что в меня пришли, на тебе ещё профайл
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
};

//круглые скобки перед фигурными скобками значит, что возвращается объект, а не тело функции
let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
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

export default connect(mapStateToProps, {getUserProfile})(withRouter(ProfileContainer));