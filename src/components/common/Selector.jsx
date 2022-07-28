import React from 'react';
import style from './Selector.module.css';

const Selector = ({ options, defaultValue, value, onChange }) => {
  return (
    <select
      className={style.selector}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option selected hidden value=''>
        {defaultValue}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Selector;
