import React, {useState} from 'react';
import style from './Friends.module.css';
import userPhoto from '../../assets/images/user.png';
import {NavLink} from "react-router-dom";
import Pagination from "../common/Pagination";

const Friends = (props) => {

    return (
        <div className={style.wrapper}>
            <h2 className={style.title}>USERS</h2>
            <Pagination {...props}/>
            <div className={style.cards}>

            {props.friends.map(friends => <div key={friends.id}>
                {/* <div className={style.header}></div> */}
                <div className={style.card}>
                    <div className={style.leftCol}>
                    <div className={style.avatar}>
                       <img src={friends.photos.small != null ? friends.photos.small : userPhoto}/>
                       
                        {friends.followed
                            //кнопка дисейблится если в массиве хоть одна айдишка равна айдишке пользователя
                            ? <button style={{padding: '0.1rem'}} className='btn btn-primary' disabled={props.followingInProgress.some(id => id === friends.id)}
                                      onClick={() => {
                                          props.unfollow(friends.id)
                                      }}>Unfollow</button>
                            //если в массиве хоть одна айдишка равна айдишке пользователя, тогда дизейблим (вернётся true. В противном случае вернётся false)
                            : <button style={{padding: '0.1rem'}} className='btn btn-primary' disabled={props.followingInProgress.some(id => id === friends.id)}
                                      onClick={() => {
                                          props.follow(friends.id)
                                      }}>Follow</button>
                        }
                    </div>
                    </div>
                                     {/*Оборачиваем карточку  пользователя ссылкой для перехода на его профиль*/}
                 <NavLink to={'/profile/' + friends.id}>

                    <div className={style.rightCol}>
                                <p>{friends.name}</p><br/>
                                <p>{friends.status ? friends.status : <small>this user have not set the status</small>}</p>
                                <p>{friends.aboutMe ? friends.aboutMe : <small>this user have not set info about himself</small>}</p>
                                <p>{friends.lookingForAJobDescription ? friends.lookingForAJobDescription : <small>this user is not looking for a job</small>}</p>

                    </div>
                    </NavLink>
                </div>

            </div>
            )}
            </div>
        </div>)
}

export default Friends;