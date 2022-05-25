import React from 'react';
import Post from './Post/Post'
import style from './MyPosts.module.css';

const MyPosts = (props) => {

    let postsElements = props.posts.map(
        (post) => <Post like={post.like} message={post.message} id={post.id}/>);

    let newPostElement = React.createRef();

    let addPost = () => {
        props.addPost();
    };

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.onPostChange(text);
    };

    return (
        <div className={style.posts}>
            <h2 className={style.posts__title}>My posts</h2>
            <form>
                <textarea onChange={onPostChange}
                          value={props.newPostText}
                          ref={newPostElement}
                placeholder='Введите текст нового поста'/>
            </form>
            <div className={style.posts__button}>
                <button type='sumbit' onClick={ addPost }>Add post</button>
                <button type='sumbit'>Remove post</button>
            </div>
            {postsElements}
        </div>);
};

export default MyPosts;