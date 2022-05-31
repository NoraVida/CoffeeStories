import React from 'react';
import { useForm } from 'react-hook-form';
import '../scss/Register.scss';

export default function RegisterForm({ fetchFn }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    shouldFocusError: true,
  });

  const submitForm = async (formData) => {
    const result = await fetchFn(formData);
    if (result.status === 200) {
      setTimeout(() => {
        reset();
      }, 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className='form-group'>
        <input
          type='text'
          name='name'
          className={`form-control mt-2 ${errors.name ? 'is-invalid' : ''}`}
          placeholder='Felhasználónév'
          id='name'
          {...register('name', {
            required: 'A felhasználónév megadása kötelező',
          })}
        />
        <div className="invalid-feedback">{errors.name ? errors.name.message : ''}</div>
      </div>
      <div className='form-group'>
        <input
          type='email'
          name='email'
          className={`form-control mt-2 ${errors.email ? 'is-invalid' : ''}`}
          placeholder='Email'
          id='email'
          {...register('email', {
            required: 'Az email cím megadása kötelező',
            pattern: {
              // eslint-disable-next-line
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Az email cím nem megfelelő',
            },
          })}
        />
        <div className="invalid-feedback">{errors.email ? errors.email.message : ''}</div>
      </div>
      <div className='form-group'>
        <input
          type='password'
          name='password'
          placeholder='Jelszó'
          className={`form-control mt-2 ${errors.password ? 'is-invalid' : ''}`}
          id='password'
          {...register('password', {
            required: 'A jelszó megadása kötelező',
            minLength: {
              value: 8,
              message: 'A jelszónak legalább 8 karaktert kell tartalmaznia',
            },
            deps: ['password', 'password2'],
            validate: (value) =>
              value === watch('password2') ||
              'A két jelszó nem egyezik',
          })}
        />
        <div className="invalid-feedback">{errors.password ? errors.password.message : ''}</div>
      </div>
      <div className='form-group'>
        <input
          type='password'
          name='password2'
          placeholder='Jelszó megerősítése'
          className={`form-control mt-2 ${errors.password2 ? 'is-invalid' : ''}`}
          id='password2'
          {...register('password2', {
            required: 'A jelszó megadása kötelező',
            minLength: {
              value: 8,
              message: 'A jelszónak legalább 8 karaktert kell tartalmaznia',
            },
            deps: ['password', 'password2'],
            validate: (value) =>
              value === watch('password') ||
              'A két jelszó nem egyezik.',
          })}
        />
        <div className="invalid-feedback">{errors.password2 ? errors.password2.message : ''}</div>
      </div>

      {(
        isSubmitSuccessful && <div>Successful registration!</div>
      )}

      <button className='btn btn-primary mt-4'>Küldés</button>
    </form>
  );
}
