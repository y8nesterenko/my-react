import React, { useState } from 'react';
import style from './Post.module.css';
import Preloader from '../../../common/Preloader';
import userPhoto from '../../../../assets/images/user.png';

const Post = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const showDeleteButton = () => {
    setIsActive(true);
  };

  const showConfirmButton = () => {
    setShowConfirm(true);
  };

  const hideButtons = () => {
    setIsActive(false);
    setShowConfirm(false);
  };

  return (
    <div className='post' onClick={hideButtons}>
      <div className='postHead'>
        <div className='postUser'>
          <div className='profilePicture'>
            <img
              src={
                props.profile.photos.large != null
                  ? props.profile.photos.small
                  : userPhoto
              }
            />
          </div>
          <div className='postInfo'>
            <h3>{props.profile.fullName}</h3>
            <small>
              <span>{new Date(props.date).toString().substr(4, 11)}</span>
              <span>{new Date(props.date).toLocaleTimeString()}</span>
            </small>
          </div>
        </div>
        <span
          onClick={(e) => e.stopPropagation()}
          className={
            isActive
              ? style.showDeleteButton + ' ' + style.active
              : style.showDeleteButton
          }
        >
          <button onClick={showConfirmButton} className='btn btnDelete'>
            delete
          </button>
          <i onClick={showDeleteButton} className='uil uil-ellipsis-h'></i>
          <span
            className={
              showConfirm
                ? style.confirmDeletePost + ' ' + style.active
                : style.confirmDeletePost
            }
          >
            <span>delete this post?</span>
            <span className={style.deleteButtons}>
              <button
                className={`btn ${style.btnYes}`}
                onClick={() => props.deletePost(props.id)}
              >
                yes
              </button>
              <button className={`btn ${style.btnNo}`} onClick={hideButtons}>
                no
              </button>
            </span>
          </span>
        </span>
      </div>
      <div className='postPhoto'>
        <img src={props.img} />
      </div>

      <div className='actionButtons'>
        <div className='interactionButtons'>
          <span>
            <i className='uil uil-heart'>
              <small>{props.like}</small>
            </i>
          </span>
          <span>
            <i className='uil uil-comment-dots'></i>
          </span>
          <span>
            <i className='uil uil-share-alt'></i>
          </span>
        </div>
        <div className='bookmark'>
          <span>
            <i className='uil uil-bookmark-full'></i>
          </span>
        </div>
      </div>

      <div className='caption'>
        <p>{props.message}</p>
      </div>
      <a className='comments textMuted'>view all comments</a>
    </div>
  );
};

export default Post;
