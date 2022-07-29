import React from 'react';
import style from './Header.module.css';
import { NavLink } from 'react-router-dom';
import userPhoto from '../../assets/images/user.png';
import Preloader from '../common/Preloader.jsx';
import SearchBar from '../common/SearchBar';

const Header = (props) => {
  if (!props.profile) {
    return <EmptyHeader />;
  }

  return (
    <header className='header'>
      <div className='container'>
        <h2 className='log'>NY Social Network</h2>
        <SearchBar placeholder='enter your request' />
        <div className='create'>
          {props.isAuth ? (
            <div>
              {props.login}
              <div>
                <button className='btn btnLogout' onClick={props.logout}>
                  Log out
                </button>
              </div>
            </div>
          ) : (
            <NavLink to={'/login'}>
              <button className='btn btnLogout'>Login</button>
            </NavLink>
          )}
          <div className='profilePicture'>
            <img
              src={
                props.profile.photos.large != null
                  ? props.profile.photos.small
                  : userPhoto
              }
            />
          </div>
        </div>
      </div>
    </header>

    // <header className={style.header}>
    //   <div className={style.header__row}>
    //     <img
    //       className={style.img}
    //       src="https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg"
    //     />
    //     <ul className={style.list}>
    //       <li>Главная</li>
    //       <li>Контакты</li>
    //       <li>О нас</li>
    //     </ul>
    //   </div>
    //   <ul className={style.loginList}>
    //     <li>
    //       {/*если в пропсах isAuth == true, показываем логин пользгователя, иначе страницу для логина*/}
    //       {props.isAuth ? (
    //         <div>
    //           {props.login}
    //           <button onClick={props.logout}>Log out</button>
    //         </div>
    //       ) : (
    //         <NavLink to={"/login"}>Login</NavLink>
    //       )}
    //     </li>
    //     <li>Аватарка</li>
    //   </ul>
    // </header>
  );
};

const EmptyHeader = () => {
  return (
    <header className='header'>
      <div className='container'>
        <h2 className='log'>NY Social Network</h2>
        <div className='searchBar'>
          <i className='uil uil-search'></i>
          <input type='search' placeholder='Enter request' />
        </div>
        <div className='create'>
          <label className='btn btn-primary' htmlFor='createPost'>
            Create
          </label>
          <NavLink to={'/login'}>
            <button className='btn btnLogout'>Login</button>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
