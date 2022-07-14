import React from "react";
import style from "./ProfileInfo.module.css";
import userPhoto from "../../assets/images/user.png";
import {Formik} from "formik";
import {Contacts} from "./ProfileInfo";
import Preloader from "../common/Preloader";

const ProfileDataForm = (props) => {
    return (
        <Formik
            initialValues={{
                fullName: props.profile.fullName,
                aboutMe: props.profile.aboutMe,
                lookingForAJob: props.profile.lookingForAJob,
                lookingForAJobDescription: props.profile.lookingForAJobDescription,
                contacts: props.profile.contacts,
            }}
            onSubmit={(values, {setSubmitting, setStatus}) => {
                props.saveProfile(values, setStatus)
                    // если запрос зарезорвился, выходим из режима редактирования
                    .then( () => {
                            props.editModeOff()
                        }
                    )
                    //если пришла ошибка запроса, тогда показываем её в статусе
                    .catch( (response) => {
                        setStatus(response);
                        setSubmitting(false);
                    });
                setSubmitting(true);
            }}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  status,
                  /* and other goodies */
              }) => (
                <form name='edit-profile' onSubmit={handleSubmit} className={style.user}>
                    {isSubmitting && <Preloader/>}
                    <div className={style.user__column}>
                        <div className={style.user__logo}>
                            <img src={props.profile.photos.large != null ? props.profile.photos.small : userPhoto}/>
                        </div>
                    </div>
                    <div className={style.user__column}>
                        <div className={style.user__name}>
                            Name: <input
                            type="textarea"
                            name="fullName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.fullName}
                        /></div>

                        <ul className={style.user__info}>
                            <li>
                                About Me:
                                <textarea
                                    name="aboutMe"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.aboutMe}
                                />
                            </li>
                            <li>
                                Looking for a job:
                                <input
                                    type="checkbox"
                                    name="lookingForAJob"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.lookingForAJob}
                                />
                            </li>
                            <li>
                                My professional skills:
                                <textarea
                                    name="lookingForAJobDescription"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.lookingForAJobDescription}
                                /></li>
                            <li>Contacts: {Object.keys(props.profile.contacts).map(key => {
                                return (
                                    <div key={`contacts.${key}`}>
                                        {key} : <input
                                        type="text"
                                        name={`contacts.${key}`}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.contacts[key]}
                                    />
                                        <span
                                            className={style.error}>{status}
                                        </span>
                                    </div>)
                            })}</li>
                        </ul>
                        {props.isOwner &&
                            <button type="submit"
                                    disabled={isSubmitting}>
                                Save changes
                            </button>}

                    </div>
                </form>
            )}
        </Formik>
    )
};

export default ProfileDataForm;
