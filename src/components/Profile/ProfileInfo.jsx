import React from "react";
import style from "./ProfileInfo.module.css";
import Preloader from "../common/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../assets/images/user.png";

const ProfileInfo = (props) => {

   //если профиля нет (null или undefined)
   if (!props.profile) {
      return <Preloader />
   }

   const onMainPhotoSelected = (e) => {
      if (e.target.files.length) {
       props.savePhoto(e.target.files[0])
      }
   }

   return (
      <div>
         <div className={style.content__image}>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5p2iOBVzsB3w26p1RW__mby0x1393ZFLNzlB9Ai-crOWgq0RPx45_tmlm1i7WMGqgiqU&usqp=CAU' /> </div>
         <div className={style.user}>
            <div className={style.user__column}>
               <div className={style.user__logo}>
                  <img src={props.profile.photos.large != null ? props.profile.photos.small : userPhoto}/>
               </div>
            </div>
            <div className={style.user__column}>
               <div className={style.user__name}>{props.profile.fullName}</div>
               {props.isOwner && <div>Change your avatar<br/><input type={"file"} onChange={onMainPhotoSelected}/></div>}
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