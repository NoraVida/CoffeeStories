import React from 'react';
import { useForm } from 'react-hook-form';
import '../scss/Register.scss';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm({
  fetchFn,
  // navigate = useNavigate()
}) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    shouldFocusError: true,
  });
  const navigate = useNavigate();
  // const [fetchData, status, data] = fetchFn(
  //   '/register', 'post',
  // );

  // useEffect(() => {
  //   // handle successful/failed fetch status and data/error
  // }, [status, data]);

  // it doesnt work !!!
  // const submitForm = async (formData) => {
  //   const options = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       name: formData.name,
  //       email: formData.email,
  //       password: formData.password,
  //     }),
  //   };
  //   const result = await fetchFn('/register', options);
  //   if (result.status === 400) setError('email', { type: 'systemErrorMessage', message: result.message });
  //   if (result.status === 200) {
  //     setTimeout(() => {
  //       reset();
  //       navigate('/login');
  //     }, 2000);
  //   }
  // };

  const submitForm = async (formData) => {
    const result = await fetchFn('/register', 'post', formData);
    if (result.status === 400) {
      setError('email', { type: 'systemErrorMessage', message: result.message });
    }
    if (result.status === 200) {
      setTimeout(() => {
        reset();
        navigate('/login');
      }, 2000);
    }
  };

  // const submitForm = (formData) => {
  //   fetchData(formData);
  // };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="form-group">
        <input
          type="text"
          name="name"
          className={`form-control mt-2 ${errors.name ? 'is-invalid' : ''}`}
          placeholder="Felhasználónév"
          id="name"
          {...register('name', {
            required: 'A felhasználónév megadása kötelező',
          })}
        />
        <div className="invalid-feedback">{errors.name ? errors.name.message : ''}</div>
      </div>
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
              value: // eslint-disable-next-line
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Az email cím nem megfelelő',
            },
          })}
        />
        <div className="invalid-feedback">{errors.email ? errors.email.message : ''}</div>
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
            deps: ['password', 'password2'],
            validate: (value) => value === watch('password2')
              || 'A két jelszó nem egyezik',
          })}
        />
        <div className="invalid-feedback">{errors.password ? errors.password.message : ''}</div>
      </div>
      <div className="form-group">
        <input
          type="password"
          name="password2"
          placeholder="Jelszó megerősítése"
          className={`form-control mt-2 ${errors.password2 ? 'is-invalid' : ''}`}
          id="password2"
          {...register('password2', {
            required: 'A jelszó megadása kötelező',
            minLength: {
              value: 8,
              message: 'A jelszónak legalább 8 karaktert kell tartalmaznia',
            },
            deps: ['password', 'password2'],
            validate: (value) => value === watch('password')
              || 'A két jelszó nem egyezik.',
          })}
        />
        <div className="invalid-feedback">{errors.password2 ? errors.password2.message : ''}</div>
      </div>

      {(
        isSubmitSuccessful && <div className="alert alert-success" role="alert">Sikeresen regisztráltál!</div>
      )}
      <button className="btn btn-primary mt-4" type="submit" value="Submit">Küldés</button>
    </form>
  );
}
