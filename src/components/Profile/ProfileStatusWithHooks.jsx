import React, {useEffect, useState} from 'react';
import style from './ProfileStatus.module.css';

const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    const editModeOn = () => {
        setEditMode(true);
    };

    const editModeOff = () => {
        setEditMode(false);
        props.updateUserStatus(status);
    };

    const onUserStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    };

    useEffect(() => {
            setStatus(props.status)
        }, [props.status]
    );

    return (
        <span>{!editMode &&
                <span className={style.statusBlock}>
                        {status || "This user hasn't set status"}
                    <span onClick={editModeOn} className={style.editStatus}>&#128393;</span>
                    </span>
            }
            {editMode &&
                <input
                    onBlur={editModeOff}
                    autoFocus={true}
                    value={status}
                    onChange={onUserStatusChange}
                />
            }
        </span>
    )
};

export default ProfileStatusWithHooks;