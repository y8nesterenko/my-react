import React from 'react';
import { Formik } from 'formik';
import { newPostFormSchema } from '../../../utils/validators';
import { Input } from '../../Forms/Forms';
import userPhoto from '../../../assets/images/user.png';
import Preloader from '../../common/Preloader';

const AddPostForm = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <Formik
      initialValues={{ newPostText: '' }}
      validationSchema={newPostFormSchema}
      onSubmit={(values) => {
        props.addPost(values.newPostText);
        values.newPostText = '';
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
        <form className='createPost' onSubmit={handleSubmit}>
          <div className='profilePicture'>
            <img
              src={
                props.profile.photos.large != null
                  ? props.profile.photos.small
                  : userPhoto
              }
            />
          </div>
          <Input
            {...props}
            type='text'
            name='newPostText'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.newPostText}
            placeholder='Enter your post'
            touched={touched.newPostText}
            error={errors.newPostText}
            id='createPost'
          />

          <button
            type='submit'
            className='btn btn-primary'
            //disabled={isSubmitting}
          >
            Add post
          </button>
        </form>
      )}
    </Formik>
  );
};

export default AddPostForm;
