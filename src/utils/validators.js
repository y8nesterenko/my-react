import * as Yup from 'yup';

export const registrationFormSchema = Yup.object({
    email: Yup.string()
        .email()
        .required('Required'),
    password: Yup.string()
        .matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character")
        .required('Required'),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });

export const loginFormSchema = Yup.object({
    email: Yup.string()
        .email()
        .required('Required'),
    password: Yup.string()
        .min(2, 'Must be longer than 2 characters')
        .max(30, 'Must be 30 characters or less')
        .required('Required'),
    rememberMe: Yup.boolean(),
    captcha: Yup.string(),
});

export const newPostFormSchema = Yup.object({
    newPostText: Yup.string()
        .min(2, 'Must be longer than 2 characters')
        .max(30, 'Must be 30 characters or less')
        .required('An empty post cannot be added'),
});

export const newMessageFormSchema = Yup.object({
    newMessageBody: Yup.string()
        .min(2, 'Must be longer than 2 characters')
        .max(30, 'Must be 30 characters or less')
        .required('An empty message cannot be sent'),
});