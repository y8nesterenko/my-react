import React from 'react';
import style from './Friends.module.css';
import userPhoto from '../../assets/images/user.png';
import {NavLink} from "react-router-dom";
import * as axios from "axios";
import {usersAPI} from "../../api/api";

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
                                //кнопка дисейблится если в массиве хоть одна айдишка равна айдишке пользователя
                                ? <button disabled={props.followingInProgress.some(id => id === friends.id)}
                                          onClick={() => {
                                              props.unfollow(friends.id)
                                          }}>Unfollow</button>
                                //если в массиве хоть одна айдишка равна айдишке пользователя, тогда дизейблим (вернётся true. В противном случае вернётся false)
                                : <button disabled={props.followingInProgress.some(id => id === friends.id)}
                                          onClick={() => {
                                              props.follow(friends.id)
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