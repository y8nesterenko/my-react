import React, { useState, useMemo } from 'react';
import Post from './Post/Post';
import style from './MyPosts.module.css';
import Preloader from '../../common/Preloader';
import Selector from '../../common/Selector';
import AddPostForm from './AddPostForm';
import SearchBar from '../../common/SearchBar';

//React.memo - аналог shouldComponentUpdate для классовой компоненты
const MyPosts = React.memo((props) => {
  const [selectedSort, setSelectedSort] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const sortedPosts = useMemo(() => {
    if (selectedSort === 'id') {
      return [...props.posts].sort((a, b) => a - b);
    }
    return [...props.posts].sort((a, b) => a - b).reverse();
  }, [selectedSort, props.posts]);

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, sortedPosts]);

  const sortPosts = (sort) => {
    setSelectedSort(sort);
  };

  let postsElements = sortedAndSearchedPosts.map((post) => (
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
      <div className={style.postsFilter}>
        <div className={style.selector}>
          <Selector
            value={selectedSort}
            onChange={sortPosts}
            defaultValue='sort by'
            options={[
              { value: 'id', name: 'old first' },
              { value: 'date', name: 'new first' },
            ]}
          />
        </div>
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='search for post'
        />
      </div>
      {!sortedAndSearchedPosts.length && (
        <h3 className='postsSubtitle'>The are no posts yet</h3>
      )}
      {props.profile ? postsElements : <Preloader />}
    </div>
  );
});

export default MyPosts;
