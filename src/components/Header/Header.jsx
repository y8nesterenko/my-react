import React from "react";
import style from "./Header.module.css";

const Header = () => {
   return (
      <header className={style.header}>
         <img src="https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg" />
          <ul className="list">
              <li className="list__item" id="num" value="текст">Главная</li>
              <li className="list__item">Контакты</li>
              <li className="list__item">О нас</li>
          </ul>
      </header>
   );
}

export default Header;