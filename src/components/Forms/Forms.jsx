import React from "react";
import style from "./Forms.module.css";

export const Input = ({...props}) => {
    const hasError = props.error && props.touched;
    return (
        <div className={style.field}>
            {props.type === 'textarea'
                ? (<textarea {...props}
                             className={style.input + ' ' + (hasError ? style.inputError : '')}
                />)
                : (<input {...props}
                    className={style.input + ' ' + (hasError ? style.inputError : '')}
                />)
            }
            <h6 className={style.error}>
                {hasError && props.error}
            </h6>
        </div>
    )
};