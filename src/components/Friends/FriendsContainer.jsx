import React from "react";
import Friends from "./Friends";
import {connect} from "react-redux";
import {follow, unfollow, requestUsers, setCurrentPage} from "../../redux/friends-reducer";
import Preloader from "../common/Preloader";
import {compose} from "redux";
import {
    getUsers, getCurrentPage, getFollowingInProgress,
    getIsFetching, getPageSize, getTotalFriendsCount,
} from "../../redux/userSelectors";

class FriendsContainer extends React.Component {

    //constructor можно не писать, если он просто передаёт пропсы родителю (super'у). Он это делает по умолчанию
    //constructor(props) {
    //super(props);}
    componentDidMount() {
       this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }

    //метод для запроса на сервер при клике на текущию страницу массива пользователей
    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    };


    //props'ы сюда не приходят
    //render перерисовки не делает. Реакт говорит компоненте "дай мне JSX, а я дальше уже подумаю, что с ним делать"
    render() {

        return (
            //оборачиваем компонент Friends пустым элементом (фрагментом)
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <Friends
                    totalFriendsCount={this.props.totalFriendsCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    friends={this.props.friends}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    followingInProgress={this.props.followingInProgress}
                />
            </>
        )
    }
};

/*
let mapStateToProps = (state) => {
    return {
        //прокидываем через пропсы в компоненту данные из редюсера
        // при изменении state'a connect заново вызывает MSTP, чтобы достать новые, свежие пропсы
        friends: state.friendsPage.friends,
        pageSize: state.friendsPage.pageSize,
        totalFriendsCount: state.friendsPage.totalFriendsCount,
        currentPage: state.friendsPage.currentPage,
        isFetching: state.friendsPage.isFetching,
        followingInProgress: state.friendsPage.followingInProgress,
    }
};
 */

let mapStateToProps = (state) => ({
    friends: getUsers(state),
    pageSize: getPageSize(state),
    totalFriendsCount: getTotalFriendsCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
});

/*
export default connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    getUsers,
})(FriendsContainer);
*/

export default compose(
    connect(mapStateToProps, {
        follow,
        unfollow,
        setCurrentPage,
        requestUsers,
    }),
    //withAuthRedirect,
)(FriendsContainer);