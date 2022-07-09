import React from 'react';
import style from './Friends.module.css';
import userPhoto from '../../assets/images/user.png';
import {NavLink} from "react-router-dom";
import Pagination from "../common/Pagination";

const Friends = (props) => {

    return (
        <div className={style.wrapper}>
            <span className={style.title}>USERS</span>
            <Pagination {...props}/>

            {props.friends.map(friends => <div key={friends.id}>
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
            </div>
            )}
        </div>)
}

export default Friends;