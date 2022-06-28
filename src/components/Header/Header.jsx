import React from "react";
import style from "./Header.module.css";
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={style.header}>
            <div className={style.header__row}>
                <img className={style.img} src="https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg"/>
                <ul className={style.list}>
                    <li>Главная</li>
                    <li>Контакты</li>
                    <li>О нас</li>
                </ul>
            </div>
            <ul className={style.loginList}>
                <li>
                    {/*если в пропсах isAuth == true, показываем логин пользгователя, иначе страницу для логина*/}
                    {props.isAuth
                        ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
                        : <NavLink to={'/login'}>Login</NavLink> }</li>
                <li>Аватарка</li>
            </ul>

        </header>
    );
}

export default Header;