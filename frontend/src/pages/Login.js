import React from 'react';

import LoginForm from '../components/LoginForm';
import { useAuthContext } from '../helper/AuthContext';

function Login() {
  const { /* loggedInUser, */ setLoggedInUser } = useAuthContext();

  return (
    <section className="form--background">
      <div className="card p-5 form--container">
        <h2 className="mb-4">Bejelentkezés</h2>
        <LoginForm setLoggedInUser={setLoggedInUser} />
      </div>
    </section>
  );
}

export default Login;
