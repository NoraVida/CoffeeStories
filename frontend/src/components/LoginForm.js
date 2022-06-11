import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { getDataFromToken } from '../helper/utils';
// import '../scss/Register.scss';

export default function LoginForm({ fetchFn, setLoggedInUser }) {
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
  const navigate = useNavigate();

  const submitForm = async (formData) => {
    const result = await fetchFn('/login', 'post', formData);
    if (result.status === 200) {
      setLoggedInUser(getDataFromToken(result.token));
      localStorage.setItem('coffeeStoriesToken', result.token);
      navigate('/coffees');
      reset();
    } else {
      setError('email', { type: 'systemErrorMessage', message: result.message });
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
        <Link to="/register">Ide kattintva regisztrálhatsz</Link>
      </div>

      <button className="btn btn-primary mt-4" type="submit" value="Submit">Küldés</button>
    </form>
  );
}
