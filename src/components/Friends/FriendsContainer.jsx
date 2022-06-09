import React from "react";
import Friends from "./Friends";
import {connect} from "react-redux";
import {
    follow,
    setCurrentPage, setTotalUsersCount,
    setUsers, toggleIsFetching,
    unfollow
} from "../../redux/friends-reducer";
import * as axios from "axios";
import Preloader from "../common/Preloader";

//классовая компонента
class FriendsContainer extends React.Component {

    //contructor можно не писать, если он просто передаёт пропсы родителю (super'у). Он это делает по умолчанию
    //constructor(props) {
    //super(props);}
    componentDidMount() {
        //здесь делаем все side-эффекты (запросы на сервер и т.д.)

        //перед запросом меняем состояние isFetching на true, чтобы загрузился preloader
        this.props.toggleIsFetching(true);

        if (this.props.friends.length === 0) {
            //говорим "Аксиос, дай мне данныепо такой-то ссылке
            axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
                //когда будет ответ, выполняем логику (функцию)
                .then(response => {

                    //после запроса меняем состояние isFetching на false, чтобы убрать preloader
                    this.props.toggleIsFetching(false);

                    //сетаем (получаем данные) юзеров и закидываем их в state

                    //отдаём в dispatch массив юзеров, чтобы записать его в state
                    this.props.setUsers(response.data.items);
                    //отдаём в dispatch общее количество юзеров, чтобы записать его в state
                    this.props.setTotalUsersCount(response.data.totalCount);

                });
        }
    }

    //метод для запроса на сервер при клике на текущию страницу массива пользователей
    onPageChanged = (pageNumber) => {

        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true);
        //делаем запрос на сервер за новой порцией данных о юзерах при изменении текущего номера страницы
        //в пропсах на момент клика будет старый currentPage. Поэтому вместо него указываем pageNumber, по которуму кликаем
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(response.data.items);
            });
    };


    //props'ы сюда не приходят
    //render перерисовки не делает. Реакт говорит компоненте "дай мне JSX, а я дальше уже подумаю, что с ним делать"
    render() {

 return (
     //оборачиваем компонент Friends пустым элементом (фрагментом)
     <>
         {this.props.isFetching ? <Preloader /> : null}
          <Friends
              totalFriendsCount={this.props.totalFriendsCount}
              pageSize={this.props.pageSize}
              currentPage={this.props.currentPage}
              onPageChanged={this.onPageChanged}
              friends={this.props.friends}
              follow={this.props.follow}
              unfollow={this.props.unfollow}
          />
     </>
        )
    }
};

let mapStateToProps = (state) => {
    return {
        //прокидываем через пропсы в компоненту данные из редюсера
        // при изменении state'a connect заново вызывает MSTP, чтобы достать новые, свежие пропсы
        friends: state.friendsPage.friends,
        pageSize: state.friendsPage.pageSize,
        totalFriendsCount: state.friendsPage.totalFriendsCount,
        currentPage: state.friendsPage.currentPage,
        isFetching: state.friendsPage.isFetching,
    }
};
//
// let mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//         dispatch(followActionCreator(userId))
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowActionCreator(userId))
//         },
//         setUsers: (friends) => {
//             dispatch(setUsersActionCreator(friends))
//         },
//         setCurrentPage: (pageNumber) => {
//           dispatch(setCurrentPageAC(pageNumber))
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setTotalUsersCountAC(totalCount))
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(toggleIsFetchingAC(isFetching))
//         },
//     }
// };

export default connect(mapStateToProps, {follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching})(FriendsContainer);