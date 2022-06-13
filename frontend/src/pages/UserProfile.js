import React from 'react';
import { useAuthContext } from '../helper/AuthContext';
// import RegisterForm from '../components/RegisterForm';

function UserProfile() {
  const { loggedInUser } = useAuthContext();

  return (
    <>
      {loggedInUser?.userId ? (
        <section className="form--background">
          <div className="card p-5 form--container">
            <h2 className="mb-4">Az adataid:</h2>
          </div>
        </section>
      ) : (
        <section className="form--background">
          <div className="card p-5 form--container">
            <h2 className="mb-4">Regisztráció</h2>
            {/* <RegisterForm /> */}
          </div>
        </section>
      )}
    </>
  );
}

export default UserProfile;
