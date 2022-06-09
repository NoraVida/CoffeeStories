import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { registerNewUser } from '../helper/utils';
import '../scss/Register.scss';

function Register() {
  return (
    <section className="register">
      <div className="container">
        <h2 className="mb-4">Regisztráció</h2>
        <RegisterForm fetchFn={registerNewUser} />
      </div>
    </section>
  );
}

export default Register;
