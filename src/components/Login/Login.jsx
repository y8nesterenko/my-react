import React from "react";
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
        <div>
            <h1>Please login in the form below </h1>
            <LoginForm {...props}/>
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
            }}
            validationSchema={loginFormSchema}
            onSubmit={(values, {setSubmitting, setStatus}) => {
                props.login(values.email, values.password, values.rememberMe, setStatus);
                setSubmitting(false);
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

                <form onSubmit={handleSubmit}>
                    <Input type="email"
                           name="email"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.email}
                           placeholder='Enter your email'
                           touched={touched.email}
                           error={errors.email}
                    />
                    <Input type="password"
                           name="password"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.password}
                           placeholder='Enter your password'
                           touched={touched.password}
                           error={errors.password}
                    />
                    <div>
                        <input
                            type="checkbox"
                            name="rememberMe"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.rememberMe}
                        />remember me
                        <div
                            className={style.error}>{errors.rememberMe && touched.rememberMe && errors.rememberMe}</div>
                    </div>
                    <div className={style.error}>{status}</div>

                    <button type="submit"
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
});

export default connect(mapStateToProps, {login})(Login);

