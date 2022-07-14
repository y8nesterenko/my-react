import React, {useState} from "react";
import style from "./ProfileInfo.module.css";
import Preloader from "../common/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../assets/images/user.png";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false);

    //если профиля нет (null или undefined)
    if (!props.profile) {
        return <Preloader/>
    }


    return (
        <div>
            <div className={style.content__image}>
                <img
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5p2iOBVzsB3w26p1RW__mby0x1393ZFLNzlB9Ai-crOWgq0RPx45_tmlm1i7WMGqgiqU&usqp=CAU'/>
            </div>
            {editMode
                ? <ProfileDataForm {...props} editModeOff={() => {
                    setEditMode(false)
                }}/>
                : <ProfileData {...props} editModeOn={() => {
                    setEditMode(true)
                }}/>
            }
        </div>
    );
};

const ProfileData = (props) => {

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    return (
        <div className={style.user}>
            <div className={style.user__column}>
                <div className={style.user__logo}>
                    <img src={props.profile.photos.large != null ? props.profile.photos.small : userPhoto}/>
                </div>
            </div>
            <div className={style.user__column}>
                <div className={style.user__name}>Name: {props.profile.fullName}</div>
                {props.isOwner &&
                    <div>Change your avatar<br/><input type={"file"} onChange={onMainPhotoSelected}/></div>
                }

                <ul className={style.user__info}>
                    <li>About Me: {props.profile.aboutMe}
                        {props.isOwner && <button onClick={props.editModeOn}>Edit your Profile</button>}
                    </li>
                    <li>Looking for a job: {props.profile.lookingForAJob ? 'yes' : 'no'}</li>
                    {props.profile.lookingForAJob &&
                        <li>My professional skills: {props.profile.lookingForAJobDescription}</li>}
                    {/*<li><ProfileStatus status={props.status}
                                     updateUserStatus={props.updateUserStatus} /></li>*/}
                    <li><ProfileStatusWithHooks status={props.status}
                                                updateUserStatus={props.updateUserStatus}/></li>
                    {/* Итерируемся по объекту с помощью Object.keys (глобальный конструктор, с помощью которого можно создавать любые объекты) */}
                    <li>Contacts: {Object.keys(props.profile.contacts).map(key => {
                        return <Contacts key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
                    })}</li>
                </ul>
            </div>
        </div>
    )
}

export const Contacts = ({contactTitle, contactValue}) => {
    return (
        <li className={style.contacts}>
            {contactTitle}: {contactValue}
        </li>
    )
};

export default ProfileInfo;