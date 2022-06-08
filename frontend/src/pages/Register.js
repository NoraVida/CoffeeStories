import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { registerNewUser } from '../helper/utils';
import '../scss/Register.scss';

function Register() {
  return (
    <section className="register">
      <div className="container">
        <h1 className="mb-4">Regisztráció</h1>
        <RegisterForm fetchFn={registerNewUser} />
      </div>
    </section>
  );
}

export default Register;
