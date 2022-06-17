import React from 'react';
import style from './Friends.module.css';
import userPhoto from '../../assets/images/user.png';
import {NavLink} from "react-router-dom";
import * as axios from "axios";


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

const Friends = (props) => {

    //узнаём количество страниц для общего числа пользователей и округляем в большую сторону
    let pagesCount = Math.ceil(props.totalFriendsCount / props.pageSize);
    //создаём массив с количеством страниц пользователей
    let pages = [];
    //заполняем массив количеством значений
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    ;
    //вывод части старниц в пагинации
    let curPF = ((props.currentPage - 5) < 0) ? 0 : props.currentPage - 5;
    let curPL = props.currentPage + 5;
    let slicedPages = pages.slice(curPF, curPL);

    return (
        <div className={style.wrapper}><span className={style.title}>USERS</span>

            {/*выводим кнопки пагинации для отображения пользователей*/}
            <div className={style.pagination}>
                {/*пробегаемся по количеству страниц в массиве и отображаем каждую в отдельной кнопке*/}
                {slicedPages.map(p => {
                    //стрелочная функция всегда должна что-то возвращать (return'ить)
                    return <button key={p.id}
                        //если номер текущей страницы равен номеру страницы, тогда выделяем её в css
                                   className={props.currentPage === p && style.selectedPage}
                        //при клиеке меняем текущую страницу (currentPage) в state'е
                                   onClick={(e) => {
                                       props.onPageChanged(p);
                                   }}>{p}</button>
                })}
            </div>
            {
                props.friends.map(friends => <div key={friends.id}>
                    <div className={style.header}></div>
                    <div className={style.body}>
                        <div className={style.avatar}>

                            {/*Оборачиваем картинку пользователя ссылкой для перехода на его профиль*/}
                            <NavLink to={'/profile/' + friends.id}>
                                <img src={friends.photos.small != null ? friends.photos.small : userPhoto}/>
                            </NavLink>
                            {friends.followed
                                ? <button onClick={() => {
                                    //для отписки делаем delete-запрос. В delete-запросе withCredentials идёт вторым параметром, как и в get-запросе
                                    axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${friends.id}`,
                                        {withCredentials: true},
                                        /*если нужно привязываем ключ
                                        headers: {
                                        'API-KEY': 'b1775b2f-c3a5-4509-8dc9-90b5629de7c3'
                                        }
                                    */
                                    )
                                        .then(response => {
                                            //если сервер подверждает, что мы залогинены
                                            if (response.data.resultCode === 0) {
                                                //только тогда диспатчим в редюсер екшн о подписке на пользователя
                                                props.unfollow(friends.id)
                                            }
                                        });
                                }}>Unfollow</button>
                                : <button onClick={() => {

                                    //в пост запросе об отправке запроса с куки указываем третьим параметром (второй - пустой объект или null
                                    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${friends.id}`, {},
                                        {withCredentials: true}
                                    /*если нужно привязываем ключ
                                        headers: {
                                        'API-KEY': 'b1775b2f-c3a5-4509-8dc9-90b5629de7c3'
                                    */
                                    )
                                        .then(response => {
                                            //если сервер подверждает, что мы залогинены
                                            if (response.data.resultCode === 0) {
                                                //только тогда диспатчим в редюсер екшн о подписке на пользователя
                                                props.follow(friends.id)
                                            }
                                        });
                                }}>Follow</button>
                            }
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
        </div>)
}

export default Friends;