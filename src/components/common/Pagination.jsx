import style from "./Pagination.module.css";
import React from "react";

const Pagination = (props) => {

    //узнаём количество страниц для общего числа пользователей и округляем в большую сторону
    let pagesCount = Math.ceil(props.totalFriendsCount / props.pageSize);
    //создаём массив с количеством страниц пользователей
    let pages = [];
    //заполняем массив количеством значений
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    ;

    //вывод части старниц в пагинации
    let curPF = ((props.currentPage - 5) < 0) ? 0 : props.currentPage - 5;
    let curPL = props.currentPage + 5;
    let slicedPages = pages.slice(curPF, curPL);

    return (
        <div>
            {/*выводим кнопки пагинации для отображения пользователей*/}
            <div className={style.pagination}>
                {/*пробегаемся по количеству страниц в массиве и отображаем каждую в отдельной кнопке*/}
                {slicedPages.map(p => {
                    //стрелочная функция всегда должна что-то возвращать (return'ить)
                    return <button key={p.id}
                        //если номер текущей страницы равен номеру страницы, тогда выделяем её в css
                                   className={props.currentPage === p && style.selectedPage}
                        //при клиеке меняем текущую страницу (currentPage) в state'е
                                   onClick={(e) => {
                                       props.onPageChanged(p);
                                   }}>{p}</button>
                })}
            </div>
        </div>
    )
};

export default Pagination;