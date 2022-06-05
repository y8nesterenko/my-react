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

    constructor(props) {
        super(props);

        if (this.props.friends.length === 0) {
            //говорим "Аксиос, дай мне данныепо такой-то ссылке
            axios.get('https://social-network.samuraijs.com/api/1.0/users')
                //когда будет ответ, выполняем логику (функцию)
                .then(response => {
                    //сетаем (получаем данные) юзеров и закидываем их в state

                    //отдаём в dispatch массив юзеров
                    this.props.setUsers(response.data.items)
                });
        }
    }


    //props'ы сюда не приходят
    render() {
        return (
            <div className={style.wrapper}><span>USERS</span>

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