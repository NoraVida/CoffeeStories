import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useFetch from 'use-http';

import { getDataFromToken, getTokenFromLocalStorage } from '../helper/utils';
import { useAuthContext } from '../helper/AuthContext';

export default function UserProfileForm() {
  const {
    register,
    reset,
    watch,
    handleSubmit,
    setError,
    setValue,
    getValues,
    formState: { errors, dirtyFields },
  } = useForm({
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    shouldFocusError: true,
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      newPassword: '',
      password2: '',
      currentPassword: '',
    },
  });

  const {
    register: registerDel,
    handleSubmit: handleSubmitDel,
    formState: { errors: errorsDel },
  } = useForm({
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    shouldFocusError: true,
    mode: 'onChange',
    defaultValues: {
      currentPassword: '',
    },
  });

  const options = {
    headers: {
      'Content-Type': 'application/json',
      ...(getTokenFromLocalStorage() && { Authorization: `Bearer ${getTokenFromLocalStorage()}` }),
    },
  };

  const { request, response } = useFetch(`${process.env.REACT_APP_BACKEND_URI}`, options);
  const { loggedInUser, setLoggedInUser } = useAuthContext();

  const submitForm = async (formData) => {
    const dirtyData = {};
    Object.keys(dirtyFields).forEach((field) => { dirtyData[field] = formData[field]; });
    dirtyData.token = localStorage.coffeeStoriesToken;

    const result = await request.patch('/user', formData);
    if (result.message === 'Ez az email már foglalt') {
      setError('email', { type: 'systemErrorMessage', message: result.message });
    }
    if (response.ok) {
      setLoggedInUser(getDataFromToken(result.token));
      localStorage.setItem('coffeeStoriesToken', result.token);
      reset();
    }
  };

  useEffect(() => {
    if (!dirtyFields.newPassword) {
      setValue('password2', '', { shouldDirty: true });
    }
  }, [dirtyFields.newPassword]);

  const items = [];
  if (dirtyFields?.name) items.push(`New Username: ${getValues('name')}`);
  if (dirtyFields?.email) items.push(`New Email: ${getValues('email')}`);
  if (dirtyFields?.newPassword) items.push('New password');

  const deleteUserProfile = async (formData) => {
    const result = await request.delete('/user', formData);
    if (response.ok) {
      console.log(result);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            className="form-control mt-2"
            placeholder={loggedInUser.name}
            id="name"
            {...register('name')}
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            className={`form-control mt-2 ${errors.email ? 'is-invalid' : ''}`}
            placeholder={loggedInUser.email}
            id="email"
            {...register('email', {
              pattern: {
                value:
                // eslint-disable-next-line
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Érvénytelen email cím',
              },
            })}
          />
          <div className="invalid-feedback">{errors.email ? errors.email.message : ''}</div>
        </div>

        <div className="form-group">
          <input
            type="password"
            name="newPassword"
            className={`form-control mt-2 ${errors.newPassword ? 'is-invalid' : ''}`}
            placeholder="Új jelszavad"
            id="newPassword"
            {...register('newPassword', {
              minLength: {
                value: 8,
                message: 'A jelszónak, legalább 8 karakternek kell lennie',
              },
              deps: ['newPassword', 'password2'],
              validate: (value) => value === watch('password2') || 'A megadott jelszavak nem egyeznek',
            })}
          />
          <div className="invalid-feedback">{errors.newPassword ? errors.newPassword.message : ''}</div>
        </div>

        {dirtyFields.newPassword && (
          <div className="form-group">
            <input
              type="password"
              name="password2"
              className={`form-control mt-2 ${errors.password2 ? 'is-invalid' : ''}`}
              placeholder="Új jelszavad újra"
              id="password2"
              {...register('password2', {
                minLength: {
                  value: 8,
                  message: 'A jelszónak, legalább 8 karakternek kell lennie',
                },
                deps: ['newPassword', 'password2'],
                validate: (value) => value === watch('newPassword') || 'A megadott jelszavak nem egyeznek',
              })}
            />
            <div className="invalid-feedback">{errors.password2 ? errors.password2.message : ''}</div>
          </div>
        )}
        <p className="pt-5">
          Az adatok módosításához meg kell adnod a jelenlegi jelszavad:
        </p>

        <div className="form-group">
          <input
            type="password"
            name="currentPassword"
            className={`form-control mt-2 ${
              errors.currentPassword ? 'is-invalid' : ''
            }`}
            placeholder="Mostani jelszavad"
            id="currentPassword"
            {...register('currentPassword', {
              required: 'A mostani jelszavad megadása kötelező',
            })}
          />
          <div className="invalid-feedback">
            {errors.currentPassword ? errors.currentPassword.message : ''}
          </div>
        </div>
        <button className="btn btn-primary mt-4" type="submit" value="Submit">
          Módosítások küldés
        </button>
      </form>

      <p className="pt-5">
        Szeretnéd törölni a fiókodat? A megerősítéshez add meg a mostani jelszavad
      </p>
      <p><b>Figyelem, a törlés nem visszavonható!</b></p>
      <form onSubmit={handleSubmitDel(deleteUserProfile)}>
        <div className="form-group">
          <input
            type="password"
            name="currentPasswordDel"
            className={`form-control mt-2 ${
              errorsDel.currentPasswordDel ? 'is-invalid' : ''
            }`}
            placeholder="Mostani jelszavad"
            id="currentPasswordDel"
            {...registerDel('currentPasswordDel', {
              required: 'A mostani jelszavad megadása kötelező',
            })}
          />
          <div className="invalid-feedback">
            {errorsDel.currentPasswordDel ? errorsDel.currentPasswordDel.message : ''}
          </div>
        </div>
        <button className="btn btn-danger mt-4" type="submit" value="Submit">
          Fiók törlése
        </button>
      </form>
    </>
  );
}
