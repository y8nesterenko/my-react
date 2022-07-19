import React from "react";
import style from "./Post.module.css";
import Preloader from "../../../common/Preloader";
import userPhoto from "../../../../assets/images/user.png";

const Post = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <div className="post">
      <div className="postHead">
        <div className="postUser">
          <div className="profilePicture">
            <img
              src={props.profile.photos.large != null ? props.profile.photos.small : userPhoto } />
          </div>
          <div className="postInfo">
            <h3>{props.profile.fullName}</h3>
            <small>{props.info}</small>
          </div>
        </div>
        <span className="edit">
            <i className="uil uil-ellipsis-h"></i>
          </span>

      </div>
      <div className="postPhoto">
        <img src={props.img} />
      </div>

      <div className="actionButtons">
         <div className="interactionButtons">
         <span><i className="uil uil-heart"><small>{props.like}</small></i></span>
            <span><i className="uil uil-comment-dots"></i></span>
            <span><i className="uil uil-share-alt"></i></span>
         </div>
         <div className="bookmark">
         <span><i className="uil uil-bookmark-full"></i></span>
         </div>
      </div>

      <div className="caption">
         <p>{props.message}</p>
      </div>
      <a className="comments textMuted">view all comments</a>

    </div>
  );
};

export default Post;
