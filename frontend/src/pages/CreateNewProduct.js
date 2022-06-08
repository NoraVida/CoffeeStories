import React from 'react';
import CreateNewProductForm from '../components/RegisterForm';
import { registerNewUser } from '../helper/utils';
import '../scss/Register.scss';

function CreateNewProduct() {
  return (
    <section className="register">
      <div className="container">
        <h1 className="mb-4">Új termék létrehozása</h1>
        <CreateNewProductForm fetchFn={registerNewUser} />
      </div>
    </section>
  );
}

export default CreateNewProduct;
