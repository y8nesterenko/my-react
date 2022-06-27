import React from "react";
import {Formik} from "formik";
import {loginFormSchema} from "../../utils/validators";

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
                passwordConfirmation: '',
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
                    <div>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        {errors.email && touched.email && errors.email}
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        {errors.password && touched.password && errors.password}
                    </div>
                    <div>
                        <input
                            type="password"
                            name="passwordConfirmation"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.passwordConfirmation}
                        />
                        {errors.passwordConfirmation && touched.passwordConfirmation && errors.passwordConfirmation}
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="rememberMe"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.rememberMe}
                        />remember me
                        <div>{touched.rememberMe && errors.rememberMe}</div>
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