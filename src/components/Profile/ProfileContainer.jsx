import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import {
  getUserProfile,
  getUserStatus,
  savePhoto,
  saveProfile,
  updateUserStatus,
} from '../../redux/profile-reducer';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import withRouter from '../../hoc/withRouter';

class ProfileContainer extends React.Component {
  refreshProfile() {
    //берём из параметров URL Id пользователя
    let userId = this.props.router.params.userId;

    //если в параметрах нет userId, тогда он равен 2
    if (!userId) {
      userId = this.props.authorizedUserId;
      //делаем програмный редирект (использовать не рекомендуется, делать редирект только с помощью JSX'а - через render при изменении state'а)
      if (!userId) {
        this.props.history.push('/login');
      }
    }

    //делаем get-запрос профиля пользователя по Id пользователя
    this.props.getUserProfile(userId);
    this.props.getUserStatus(userId);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.router.params.userId !== prevProps.router.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      //прокидываем в компоненту полученные пропсы. + помимо тех пропсов, что в меня пришли, на тебе ещё профайл
      <Profile
        {...this.props}
        isOwner={this.props.router.params.userId == this.props.authorizedUserId}
        profile={this.props.profile}
        status={this.props.status}
        updateUserStatus={this.props.updateUserStatus}
        savePhoto={this.props.savePhoto}
      />
    );
  }
}
//круглые скобки перед фигурными скобками значит, что возвращается объект, а не тело функции
let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
});

export default compose(
  connect(mapStateToProps, {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
    savePhoto,
    saveProfile,
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
