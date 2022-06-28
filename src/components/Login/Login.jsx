import React from "react";
import {Formik} from "formik";
import {loginFormSchema} from "../../utils/validators";
import style from "./Login.module.css"
import {Input} from "../Forms/Forms";

const Login = (props) => {
    return (
        <div>
            <h1>Please login in the form below </h1>
            <LoginForm/>
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
            onSubmit={(values, {setSubmitting}) => {
                console.log(JSON.stringify(values, null, 2));
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
                        <div className={style.error}>{errors.rememberMe && touched.rememberMe && errors.rememberMe}</div>
                    </div>

                    <button type="submit"
                            disabled={isSubmitting}>
                        Log in
                    </button>
                </form>
            )}

        </Formik>
    )
};


export default Login;