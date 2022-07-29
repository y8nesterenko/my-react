import React from 'react';
import style from './SearchBar.module.css';

const SearchBar = (props) => {
  return (
    <div className='searchBar'>
      <i className='uil uil-search'></i>
      <input {...props} type='search' />
    </div>
  );
};

export default SearchBar;
