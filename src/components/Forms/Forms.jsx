import React from "react";
import style from "./Forms.module.css";

export const Input = ({...props}) => {
    const hasError = props.error && props.touched;
    return (
        <div>
            {props.type === 'textarea'
                ? (<textarea {...props}
                             className={style.input + ' ' + (hasError ? style.inputError : '')}
                />)
                : (<input {...props}
                          className={style.input + ' ' + (hasError ? style.inputError : '')}
                />)
            }
            <span className={style.error}>
                {hasError && props.error}
            </span>
        </div>
    )
};