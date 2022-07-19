import React, { useState } from "react";
import style from "./ProfileInfo.module.css";
import Preloader from "../common/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../assets/images/user.png";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = (props) => {
  let [editMode, setEditMode] = useState(false);

  //если профиля нет (null или undefined)
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <div>
      {/* <div className={style.content__image}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5p2iOBVzsB3w26p1RW__mby0x1393ZFLNzlB9Ai-crOWgq0RPx45_tmlm1i7WMGqgiqU&usqp=CAU" />
      </div> */}
      {editMode 
      ? (<ProfileDataForm {...props} editModeOff={() => {setEditMode(false);}}/>) 
      : (<ProfileData {...props} editModeOn={() => {setEditMode(true); }}/>)}
    </div>
  )};

const ProfileData = (props) => {
  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };

  return (
    <div className="profileInfo">
      <div className="profilePictureBlock">
        <div className="profilePicture">        
          <img src={props.profile.photos.large != null ? props.profile.photos.small : userPhoto} />
        </div>
        {props.isOwner && (
            <div className="editProfileButtons">
              <label className="btn" htmlFor="uploadPhoto">Change avatar
                <input id='uploadPhoto' type={"file"} onChange={onMainPhotoSelected} />
              </label>
              <button className="btn" onClick={props.editModeOn}>Edit profile</button>
            </div>
          )}
      </div>
          <div className="profileItems">
        <p><span className="textBold">Name: </span>{props.profile.fullName}</p>
        <p><span className="textBold">About Me: </span>{props.profile.aboutMe}</p>
        <p><span className="textBold">Looking for a job: </span>{props.profile.lookingForAJob ? "yes" : "no"}
            {props.profile.lookingForAJob && (<p><span className="textBold">My professional skills: </span>{props.profile.lookingForAJobDescription}</p>)}
        </p>
        <p><span className="textBold">Status: </span><ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus} /></p>

        {/* Итерируемся по объекту с помощью Object.keys (глобальный конструктор, с помощью которого можно создавать любые объекты) */}

        <p><span className="textBold">Contacts:{" "}</span></p>
        {Object.keys(props.profile.contacts).map((key) => {
          return ( <Contacts key={key} contactTitle={key} contactValue={props.profile.contacts[key]} />
            );
        })}
        </div>
    </div>

    // <a className={style.profile}>
    //   <div className="profilePicture">
    //     <img src={props.profile.photos.large != null ? props.profile.photos.small : userPhoto}/>
    //   </div>
    //   {props.isOwner && (
    //     <div>
    //       Change your avatar
    //       <br />
    //       <input type={"file"} onChange={onMainPhotoSelected} />
    //     </div>
    //   )}
    //   <div className={style.handle}>
    //     <h4>{props.profile.fullName}</h4>
    //   </div>

    //   <ul className={style.user__info}>
    //     <li>
    //       About Me: {props.profile.aboutMe}
    //       {props.isOwner && (
    //         <button onClick={props.editModeOn}>Edit your Profile</button>
    //       )}
    //     </li>
    //     <li>
    //       Looking for a job: {props.profile.lookingForAJob ? "yes" : "no"}
    //     </li>
    //     {props.profile.lookingForAJob && (
    //       <li>
    //         My professional skills: {props.profile.lookingForAJobDescription}
    //       </li>
    //     )}
    //     <li>
    //       <ProfileStatusWithHooks
    //         status={props.status}
    //         updateUserStatus={props.updateUserStatus}
    //       />
    //     </li>
    //     {/* Итерируемся по объекту с помощью Object.keys (глобальный конструктор, с помощью которого можно создавать любые объекты) */}
    //     <li>
    //       Contacts:{" "}
    //       {Object.keys(props.profile.contacts).map((key) => {
    //         return (
    //           <Contacts
    //             key={key}
    //             contactTitle={key}
    //             contactValue={props.profile.contacts[key]}
    //           />
    //         );
    //       })}
    //     </li>
    //   </ul>
    // </a>

    // <div className={style.user}>
    //     <div className={style.user__column}>
    //         <div className={style.user__logo}>
    //             <img src={props.profile.photos.large != null ? props.profile.photos.small : userPhoto}/>
    //         </div>
    //     </div>
    //     <div className={style.user__column}>
    //         <div className={style.user__name}>Name: {props.profile.fullName}</div>
    //         {props.isOwner &&
    //             <div>Change your avatar<br/><input type={"file"} onChange={onMainPhotoSelected}/></div>
    //         }

    //         <ul className={style.user__info}>
    //             <li>About Me: {props.profile.aboutMe}
    //                 {props.isOwner && <button onClick={props.editModeOn}>Edit your Profile</button>}
    //             </li>
    //             <li>Looking for a job: {props.profile.lookingForAJob ? 'yes' : 'no'}</li>
    //             {props.profile.lookingForAJob &&
    //                 <li>My professional skills: {props.profile.lookingForAJobDescription}</li>}
    //             {/*<li><ProfileStatus status={props.status}
    //                              updateUserStatus={props.updateUserStatus} /></li>*/}
    //             <li><ProfileStatusWithHooks status={props.status}
    //                                         updateUserStatus={props.updateUserStatus}/></li>
    //             {/* Итерируемся по объекту с помощью Object.keys (глобальный конструктор, с помощью которого можно создавать любые объекты) */}
    //             <li>Contacts: {Object.keys(props.profile.contacts).map(key => {
    //                 return <Contacts key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
    //             })}</li>
    //         </ul>
    //     </div>
    // </div>
  );
};

export const Contacts = ({ contactTitle, contactValue }) => {
if (contactValue) {

  return (
    <li className={style.contacts}>
      {contactTitle}: <a href={contactValue}>{contactValue}</a>
    </li>
  );
}};

export default ProfileInfo;
