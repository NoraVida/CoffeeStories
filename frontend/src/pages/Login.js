import React from 'react';
import LoginForm from '../components/LoginForm';
import { loginUser } from '../helper/utils';
import { useAuthContext } from '../helper/AuthContext';

function Login() {
  const { /* loggedInUser, */ setLoggedInUser } = useAuthContext();

  return (
    <section className="register">
      <div className="container">
        <h2 className="mb-4">Bejelentkezés</h2>
        <LoginForm fetchFn={loginUser} setLoggedInUser={setLoggedInUser} />
      </div>
    </section>
  );
}

export default Login;
