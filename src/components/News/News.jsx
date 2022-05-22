import React from "react";
import style from "./News.module.css";


const News = (props) => {

       let newsElements = props.news.map(
           (newsData) => {
               return (
                   <div>{newsData.text}</div>
               )
           }
       );

    return (
        <div className={style.news}>
            {newsElements}
        </div>
    );
}

export default News;