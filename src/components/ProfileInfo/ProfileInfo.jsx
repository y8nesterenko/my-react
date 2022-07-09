import React from "react";
import style from "./ProfileInfo.module.css";
import Preloader from "../common/Preloader";
import ProfileStatusWithHooks from "../Profile/ProfileStatusWithHooks";
import userPhoto from "../../assets/images/user.png";

const ProfileInfo = (props) => {

   //если профиля нет (null или undefined)
   if (!props.profile) {
      return <Preloader />
   }

   return (
      <div>
         <div className={style.content__image}>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5p2iOBVzsB3w26p1RW__mby0x1393ZFLNzlB9Ai-crOWgq0RPx45_tmlm1i7WMGqgiqU&usqp=CAU' /> </div>
         <div className={style.user}>
            <div className={style.user__column}>
               <div className={style.user__logo}>
                  <img src={props.profile.photos.small != null ? props.profile.photos.small : userPhoto}/>
                  {/*<img src='https://www.meme-arsenal.com/memes/07d24807827e03c1af085fa5f69abe0e.jpg' />*/}
               </div>
            </div>
            <div className={style.user__column}>
               <div className={style.user__name}>{props.profile.fullName}</div>
               <ul className={style.user__info}>
                  <li>About Me: {props.profile.aboutMe}</li>
                  <li>City: Kyiv</li>
                  <li>Education: Internet</li>
                  {/*<li><ProfileStatus status={props.status}
                                     updateUserStatus={props.updateUserStatus} /></li>*/}
                  <li><ProfileStatusWithHooks status={props.status}
                                     updateUserStatus={props.updateUserStatus} /></li>
               </ul>
            </div>
         </div>
      </div>
   );
}

export default ProfileInfo;