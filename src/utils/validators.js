import * as Yup from 'yup';

export const loginFormSchema = Yup.object({
    email: Yup.string()
        .email()
        .required('Required'),
    password: Yup.string()
        .required('Required'),
    rememberMe: Yup.boolean()
        .required('Please check the box above'),
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