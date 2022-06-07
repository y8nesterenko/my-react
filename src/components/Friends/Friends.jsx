import React from 'react';
import style from './Friends.module.css';
import * as axios from "axios";
import userPhoto from '../../assets/images/user.png';


//функциональная компонента
// const Friends = (props) => {
//
//     let getUsers = () => {
//     if (props.friends.length === 0) {
//         //говорим "Аксиос, дай мне данныепо такой-то ссылке
//         axios.get('https://social-network.samuraijs.com/api/1.0/users')
//             //когда будет ответ, выполняем логику (функцию)
//             .then(response => {
//                 //сетаем (получаем данные) юзеров и закидываем их в state
//
//                 //отдаём в dispatch массив юзеров
//                 props.setUsers(response.data.items)
//             });
//     }
//     }
//
//     return (
//         <div className={style.wrapper}><span>USERS</span><button onClick={getUsers}>Get Users</button>
//             {
//                 props.friends.map(friends => <div key={friends.id}>
//                     <div className={style.header}></div>
//                     <div className={style.body}>
//                         <div className={style.avatar}>
//                             <img src={friends.photos.small != null ? friends.photos.small : userPhoto}/>
//                             {friends.followed
//                                 ? <button onClick={() => {
//                                     props.unfollow(friends.id)
//                                 }}>Unfollow</button>
//                                 : <button onClick={() => {
//                                     props.follow(friends.id)
//                                 }}>Follow</button>}
//                         </div>
//                         <div className={style.info}>
//                             <div className={style.info__column}>
//                                 <div className={style.info__row}>{friends.name}</div>
//                                 <br/>
//                                 <div className={style.info__row}>{friends.status}</div>
//                             </div>
//                             <div className={style.info__column + ' ' + style.info__column_right}>
//                                 <div className={style.info__row}>{'friends.location.country'},</div>
//                                 <div className={style.info__row}>{'friends.location.city'}</div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>)}
//             <button className={style.showMore}>Show more</button>
//         </div>
//     )
// };

//классовая компонента
class Friends extends React.Component {

    //contructor можно не писать, если он просто передаёт пропсы родителю (super'у). Он это делает по умолчанию
    //constructor(props) {
    //super(props);}
    componentDidMount() {
        //здесь делаем все side-эффекты (запросы на сервер и т.д.)

        if (this.props.friends.length === 0) {
            //говорим "Аксиос, дай мне данныепо такой-то ссылке
            axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
                //когда будет ответ, выполняем логику (функцию)
                .then(response => {
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
        //делаем запрос на сервер за новой порцией данных о юзерах при изменении текущего номера страницы
        //в пропсах на момент клика будет старый currentPage. Поэтому вместо него указываем pageNumber, по которуму кликаем
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
            });
    };


    //props'ы сюда не приходят
    //render перерисовки не делает. Реакт говорит компоненте "дай мне JSX, а я дальше уже подумаю, что с ним делать"
    render() {

        //узнаём количество страниц для общего числа пользователей и округляем в большую сторону
        let pagesCount = Math.ceil(this.props.totalFriendsCount / this.props.pageSize);
        //создаём массив с количеством страниц пользователей
        let pages = [];
        //заполняем массив количеством значений
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }
        ;

        //вывод части старниц в пагинации
        let curPF = ((this.props.currentPage - 5) < 0) ?  0  : this.props.currentPage - 5 ;
        let curPL = this.props.currentPage + 5;
        let slicedPages = pages.slice( curPF, curPL);

        return (
            <div className={style.wrapper}><span className={style.title}>USERS</span>

                {/*выводим кнопки пагинации для отображения пользователей*/}
                <div className={style.pagination}>
                    {/*пробегаемся по количеству страниц в массиве и отображаем каждую в отдельной кнопке*/}
                    {slicedPages.map(p => {
                        //стрелочная функция всегда должна что-то возвращать (return'ить)
                        return <button key={p.id}
                                       //если номер текущей страницы равен номеру страницы, тогда выделяем её в css
                                       className={this.props.currentPage === p && style.selectedPage}
                                       //при клиеке меняем текущую страницу (currentPage) в state'е
                                       onClick={(e) => { this.onPageChanged(p); }}>{p}</button>
                    })}
                </div>

                {
                    this.props.friends.map(friends => <div key={friends.id}>
                        <div className={style.header}></div>
                        <div className={style.body}>
                            <div className={style.avatar}>
                                <img src={friends.photos.small != null ? friends.photos.small : userPhoto}/>
                                {friends.followed
                                    ? <button onClick={() => {
                                        this.props.unfollow(friends.id)
                                    }}>Unfollow</button>
                                    : <button onClick={() => {
                                        this.props.follow(friends.id)
                                    }}>Follow</button>}
                            </div>
                            <div className={style.info}>
                                <div className={style.info__column}>
                                    <div className={style.info__row}>{friends.name}</div>
                                    <br/>
                                    <div className={style.info__row}>{friends.status}</div>
                                </div>
                                <div className={style.info__column + ' ' + style.info__column_right}>
                                    <div className={style.info__row}>{'friends.location.country'},</div>
                                    <div className={style.info__row}>{'friends.location.city'}</div>
                                </div>
                            </div>
                        </div>
                    </div>)}
                <button className={style.showMore}>Show more</button>
            </div>
        )
    }
};

export default Friends;