import React from 'react';
import RegisterForm from '../components/RegisterForm';
// import { registerNewUser } from '../helper/utils';
// import useFetch from '../helper/useFetch';
// import useSubmitForm from '../helper/useSubmitForm';
import { submitForm } from '../helper/utils';
import '../scss/Register.scss';

function Register() {
  return (
    <section className="form--background">
      <div className="card p-5 form--container">
        <h2 className="mb-4">Regisztráció</h2>
        <RegisterForm fetchFn={submitForm} />
      </div>
    </section>
  );
}

export default Register;
