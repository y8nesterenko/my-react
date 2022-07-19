import React, {useEffect} from "react";
import {Formik} from "formik";
import {loginFormSchema} from "../../utils/validators";
import style from "./Login.module.css"
import {Input} from "../Forms/Forms";
import {login} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";

const Login = (props) => {

    if (props.isAuth) {
        return <Navigate to={`/profile/${props.authorizedUserId}`}/>
    }

    return (
        <div className={style.title}>
          <h2>Please login in the form below </h2>
        <div className={style.container}>
            <LoginForm {...props}/>
        </div>
        </div>
    )
};

const LoginForm = (props) => {

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                rememberMe: undefined,
                captcha: '',
            }}
            validationSchema={loginFormSchema}
            onSubmit={(values, {setSubmitting, setStatus, setTouched}) => {
                setSubmitting(true);
                props.login(values.email, values.password, values.rememberMe, values.captcha, setStatus)
                    .then(() => {
                        setSubmitting(false);
                    });
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

                <form className={style.form} onSubmit={handleSubmit}>
                                        <div className={style.error}>{status}</div>
                    <div className={style.field}>
                    <Input type="email"
                           name="email"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.email}
                           placeholder='Enter your email'
                           touched={touched.email}
                           error={errors.email}
                    />
                    </div>
                    <div className={style.field}>
                    <Input type="password"
                           name="password"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.password}
                           placeholder='Enter your password'
                           touched={touched.password}
                           error={errors.password}
                    />
                    </div>
                    <div className={style.checkBox}>
                        <input 
                            type="checkbox"
                            name="rememberMe"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.rememberMe}
                        /><span className={style.rememberMe}>remember me</span>
                        <div
                            className={style.error}>{errors.rememberMe && touched.rememberMe && errors.rememberMe}</div>
                    </div>


                    {props.captchaUrl && <img className={style.captchaImg} src={props.captchaUrl}/>}
                    {props.captchaUrl && 
                    <div className={style.field}>
                    <Input type="text"
                                                name="captcha"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.captcha}
                                                placeholder='Enter captcha here'
                                                touched={touched.captcha}
                                                error={errors.captcha}
                    />
                    </div>}

                    <button className="btn" type="submit"
                            disabled={isSubmitting}>
                        Log in
                    </button>
                </form>
            )}

        </Formik>
    )
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    authorizedUserId: state.auth.userId,
    captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateToProps, {login})(Login);