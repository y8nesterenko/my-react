import React from "react";
import style from "./ProfileInfo.module.css";

const ProfileInfo = () => {
   return (
      <div>
         <div className={style.content__image}>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5p2iOBVzsB3w26p1RW__mby0x1393ZFLNzlB9Ai-crOWgq0RPx45_tmlm1i7WMGqgiqU&usqp=CAU' /> </div>
         <div className={style.user}>
            <div className={style.user__column}>
               <div className={style.user__logo}>
                  <img src='https://www.meme-arsenal.com/memes/07d24807827e03c1af085fa5f69abe0e.jpg' />
               </div>
            </div>
            <div className={style.user__column}>
               <div className={style.user__name}>Yurii Nesterenko</div>
               <ul className={style.user__info}>
                  <li>Date of birth: September 22</li>
                  <li>City: Kyiv</li>
                  <li>Education: Internet</li>
                  <li>Web-site: <a href='http://test.inf.ua' target="blank">test.inf.ua</a></li>
               </ul>
            </div>
         </div>
      </div>
   );
}

export default ProfileInfo;