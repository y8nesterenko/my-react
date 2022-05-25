import React from 'react';
import {addNewPostTextActionCreator, addPostActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import StoreContext from "../../../redux/StoreContext";

const MyPostsContainer = (props) => {

    return (
        <StoreContext.Consumer>
            { (store) => {
                let addPost = () => {
                    store.dispatch(addPostActionCreator());
                };

                let onPostChange = (text) => {
                    store.dispatch(addNewPostTextActionCreator(text));
                };
                return <MyPosts onPostChange={onPostChange}
                         addPost={addPost}
                         posts={store.getState().profilePage.posts}
                         newPostText={store.getState().profilePage.newPostText}/>
            }
        }
        </StoreContext.Consumer>
    );
};

export default MyPostsContainer;