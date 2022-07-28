import React, { useState } from 'react';
import style from './ProfileInfo.module.css';
import Preloader from '../common/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../assets/images/user.png';
import ProfileDataForm from './ProfileDataForm';

const ProfileInfo = (props) => {
  let [editMode, setEditMode] = useState(false);

  //если профиля нет (null или undefined)
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <div>
      {editMode ? (
        <ProfileDataForm
          {...props}
          editModeOff={() => {
            setEditMode(false);
          }}
        />
      ) : (
        <ProfileData
          {...props}
          editModeOn={() => {
            setEditMode(true);
          }}
        />
      )}
    </div>
  );
};

const ProfileData = (props) => {
  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };

  return (
    <div className='profileInfo'>
      <div className='profilePictureBlock'>
        <div className='profilePicture'>
          <img
            src={
              props.profile.photos.large != null
                ? props.profile.photos.small
                : userPhoto
            }
          />
        </div>
        {props.isOwner && (
          <div className='editProfileButtons'>
            <label className='btn' htmlFor='uploadPhoto'>
              Change avatar
              <input
                id='uploadPhoto'
                type={'file'}
                onChange={onMainPhotoSelected}
              />
            </label>
            <button className='btn' onClick={props.editModeOn}>
              Edit profile
            </button>
          </div>
        )}
      </div>
      <div className='profileItems'>
        <p>
          <span className='textBold'>Name: </span>
          {props.profile.fullName}
        </p>
        <p>
          <span className='textBold'>About Me: </span>
          {props.profile.aboutMe}
        </p>
        <p>
          <span className='textBold'>Looking for a job: </span>
          {props.profile.lookingForAJob ? 'yes' : 'no'}
          {props.profile.lookingForAJob && (
            <p>
              <span className='textBold'>My professional skills: </span>
              {props.profile.lookingForAJobDescription}
            </p>
          )}
        </p>
        <p>
          <span className='textBold'>Status: </span>
          <ProfileStatusWithHooks
            status={props.status}
            updateUserStatus={props.updateUserStatus}
          />
        </p>

        {/* Итерируемся по объекту с помощью Object.keys (глобальный конструктор, с помощью которого можно создавать любые объекты) */}

        <p>
          <span className='textBold'>Contacts: </span>
        </p>
        {Object.keys(props.profile.contacts).map((key) => {
          return (
            <Contacts
              key={key}
              contactTitle={key}
              contactValue={props.profile.contacts[key]}
            />
          );
        })}
      </div>
    </div>
  );
};

export const Contacts = ({ contactTitle, contactValue }) => {
  if (contactValue) {
    return (
      <li className={style.contacts}>
        {contactTitle}: <a href={contactValue}>{contactValue}</a>
      </li>
    );
  }
};

export default ProfileInfo;
