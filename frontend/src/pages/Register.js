import React from 'react';

import RegisterForm from '../components/RegisterForm';

import '../scss/Register.scss';

function Register() {
  return (
    <section className="form--background">
      <div className="card p-5 form--container">
        <h2 className="mb-4">Regisztráció</h2>
        <RegisterForm />
      </div>
    </section>
  );
}

export default Register;
