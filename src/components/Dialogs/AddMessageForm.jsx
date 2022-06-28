import {Formik} from "formik";
import {newMessageFormSchema} from "../../utils/validators";
import {Input} from "../Forms/Forms";
import React from "react";

export const AddMessageForm = (props) => {

    return (
        <Formik
            initialValues={{newMessageBody: ''}}
            validationSchema={newMessageFormSchema}
            onSubmit={(values) => {
                props.sendMessage(values.newMessageBody);
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
                    <Input
                        {...props}
                        type='textarea'
                        name="newMessageBody"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.newPostText}
                        placeholder='Enter your messsage'
                        touched={touched.newMessageBody}
                        error={errors.newMessageBody}
                    />
                    <button type="submit"
                        //disabled={isSubmitting}
                    >
                        Send message
                    </button>
                </form>
            )}
        </Formik>
    )
};