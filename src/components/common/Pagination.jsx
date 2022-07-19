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
    let curPF = ((props.currentPage - 3) < 0) ? 0 : props.currentPage - 3;
    let curPL = props.currentPage + 3;
    let slicedPages = pages.slice(curPF, curPL);

    return (
        <div>
            {/*выводим кнопки пагинации для отображения пользователей*/}
            <div className={style.pagination}>
                <button disabled={props.currentPage === 1} onClick={(e) => {
                    props.onPageChanged(pages[0]);
                }}>start
                </button>

                <button disabled={props.currentPage < 6}
                    onClick={(e) => {
                    props.onPageChanged(props.currentPage - 5);
                }}>prev
                </button>

                {/*пробегаемся по количеству страниц в массиве и отображаем каждую в отдельной кнопке*/}
                {slicedPages.map(page => {
                    //стрелочная функция всегда должна что-то возвращать (return'ить)
                    return <button key={page.id}
                        //если номер текущей страницы равен номеру страницы, тогда выделяем её в css
                                   className={props.currentPage === page && style.selectedPage}
                        //при клиеке меняем текущую страницу (currentPage) в state'е
                                   onClick={(e) => {
                                       props.onPageChanged(page);
                                   }}>{page}</button>
                })}

                <button disabled={props.currentPage > pages.length - 5}
                    onClick={(e) => {
                        props.onPageChanged(props.currentPage + 5);
                    }}>next
                    </button>

                <button disabled={props.currentPage === pages.length} onClick={(e) => {
                    props.onPageChanged(pages.length);
                }}>end
                </button>

            </div>
        </div>
    )
};

export default Pagination;