import React, { useState } from 'react';
import Post from './Post/Post';
import style from './MyPosts.module.css';
import Preloader from '../../common/Preloader';
import Selector from '../../common/Selector';
import AddPostForm from './AddPostForm';

//React.memo - аналог shouldComponentUpdate для классовой компоненты
const MyPosts = React.memo((props) => {
  const [selectedSort, setSelectedSort] = useState('');

  const getSortedPosts = () => {
    if (selectedSort === 'id') {
      return [...props.posts].sort((a, b) => a - b);
    }
    return [...props.posts].sort((a, b) => a - b).reverse();
  };

  const sortedPosts = getSortedPosts();
  const sortPosts = (sort) => {
    setSelectedSort(sort);
  };

  let postsElements = sortedPosts.map((post) => (
    <Post
      like={post.like}
      message={post.message}
      img={post.img}
      key={post.id}
      id={post.id}
      date={post.date}
      {...props}
    />
  ));
  return (
    <div>
      <AddPostForm addPost={props.addPost} {...props} />
      <h2 className='postsTitle'>Posts</h2>
      <Selector
        value={selectedSort}
        onChange={sortPosts}
        defaultValue='sort by'
        options={[
          { value: 'id', name: 'old first' },
          { value: 'date', name: 'new first' },
        ]}
      />
      {!postsElements.length && (
        <h3 className='postsSubtitle'>The are no posts yet</h3>
      )}
      {props.profile ? postsElements : <Preloader />}
    </div>
  );
});

export default MyPosts;
