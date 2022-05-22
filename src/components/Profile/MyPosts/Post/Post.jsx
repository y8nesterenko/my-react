import React from 'react';
import style from './Post.module.css';

const Post = (props) => {
   return (
      <div>
         <div className={style.post}>
            <img className={style.avatar} src="https://static.sweet.tv/images/cache/movie_banners/BDNFQEQCOJ2SAAQ=/11354-avatar_400x600.jpg" />
             <p>{props.message}</p>
         </div>
         <div className={style.button}><button >&#128077; {props.like} Like</button></div>



      </div>
   );
}

export default Post;