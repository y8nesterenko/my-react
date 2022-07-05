import React from 'react';
import Post from './Post/Post'
import style from './MyPosts.module.css';
import {Formik} from "formik";
import {newPostFormSchema} from "../../../utils/validators";
import {Input} from "../../Forms/Forms";

const AddPostForm = (props) => {

    return (
        <Formik
            initialValues={{newPostText: ''}}
            validationSchema={newPostFormSchema}
            onSubmit={(values) => {
                props.addPost(values.newPostText);
            }}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                    <Input
                        {...props}
                        type="textarea"
                        name="newPostText"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.newPostText}
                        placeholder='Enter your post'
                        touched={touched.newPostText}
                        error={errors.newPostText}
                    />

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

//React.memo - аналог shouldComponentUpdate для классовой компоненты
const MyPosts = React.memo ((props) => {
    let postsElements = props.posts.map(
        (post) => <Post like={post.like} message={post.message} key={post.id} id={post.id}/>);
    return (
        <div className={style.posts}>
            <h2 className={style.posts__title}>My posts</h2>
            <AddPostForm addPost={props.addPost}/>
            {postsElements}
        </div>);
});

/*refactor to classComponent (Ctrl + Shift + Alt + T)
class MyPosts extends React.Component {

PureComponent делает проверку shouldComponentUpdate автоматически за нас
    class MyPosts extends React.PureComponent {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props !== nextProps || this.state !== nextState
    }

    render() {
        let postsElements = this.props.posts.map(
            (post) => <Post like={post.like} message={post.message} key={post.id} id={post.id}/>);
        return (
            <div className={style.posts}>
                <h2 className={style.posts__title}>My posts</h2>
                <AddPostForm addPost={this.props.addPost}/>
                {postsElements}
            </div>);
    }
}
 */

export default MyPosts;