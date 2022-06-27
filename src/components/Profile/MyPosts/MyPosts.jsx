import React from 'react';
import Post from './Post/Post'
import style from './MyPosts.module.css';
import {Formik} from "formik";

const AddPostForm = (props) => {
    return (
        <Formik
            initialValues={{newPostText: ''}}
            onSubmit={(values) => {
                props.addPost(values.newPostText);
                //alert(JSON.stringify(values.newPostText));
            }}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  //isSubmitting,
                  /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="textarea"
                            name="newPostText"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            //value={values.newPostBody}
                            placeholder='Enter your post'
                        />
                        {errors.newPostText && touched.newPostText && errors.newPostText}
                    </div>
                    <button type="submit"
                            //disabled={isSubmitting}
                    >
                        Add post
                    </button>
                </form>
            )}
        </Formik>
    )
};

const MyPosts = (props) => {

    let postsElements = props.posts.map(
        (post) => <Post like={post.like} message={post.message} key={post.id} id={post.id}/>);

    let newPostElement = React.createRef();

    let addPost = () => {
        props.addPost();
    };


    return (
        <div className={style.posts}>
            <h2 className={style.posts__title}>My posts</h2>
            <AddPostForm addPost={props.addPost} />
            {postsElements}
        </div>);
};

export default MyPosts;