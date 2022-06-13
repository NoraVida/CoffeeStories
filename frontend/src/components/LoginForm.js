import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import useFetch from 'use-http';

import { getDataFromToken } from '../helper/utils';

export default function LoginForm({ setLoggedInUser }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    shouldFocusError: true,
  });

  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const {
    request, response,
  } = useFetch(`${process.env.REACT_APP_BACKEND_URI}`, options);

  const submitForm = async (formData) => {
    const result = await request.post('/login', formData);
    if (response.ok) {
      setLoggedInUser(getDataFromToken(result.token));
      localStorage.setItem('coffeeStoriesToken', result.token);
      navigate('/coffees');
      reset();
    } else if (result.message === 'Nem helyes email') {
      setError('email', { type: 'systemErrorMessage', message: result.message });
    } else {
      setError('password', { type: 'systemErrorMessage', message: result.message });
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="form-group">
        <input
          type="email"
          name="email"
          className={`form-control mt-2 ${errors.email ? 'is-invalid' : ''}`}
          placeholder="Email"
          id="email"
          {...register('email', {
            required: 'Az email cím megadása kötelező',
            pattern: {
              value:
              // eslint-disable-next-line
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Az email cím nem megfelelő',
            },
          })}
        />
        <div className="invalid-feedback">
          {errors.email ? errors.email.message : ''}
        </div>
      </div>
      <div className="form-group">
        <input
          type="password"
          name="password"
          placeholder="Jelszó"
          className={`form-control mt-2 ${errors.password ? 'is-invalid' : ''}`}
          id="password"
          {...register('password', {
            required: 'A jelszó megadása kötelező',
            minLength: {
              value: 8,
              message: 'A jelszónak legalább 8 karaktert kell tartalmaznia',
            },
          })}
        />
        <div className="invalid-feedback">
          {errors.password ? errors.password.message : ''}
        </div>
      </div>

      <div className="mt-4">
        <div>
          Nincs még fiókod?
        </div>
        <Link to="/user">Ide kattintva regisztrálhatsz</Link>
      </div>

      <button className="btn btn-primary mt-4" type="submit" value="Submit">Küldés</button>
    </form>
  );
}
