import React from 'react';
import CreateNewProductForm from '../components/CreateNewProductForm';
// import { registerNewUser } from '../helper/utils';
import '../scss/Register.scss';

function CreateNewProduct() {
  return (
    <section className="register">
      <div className="container">
        <h2 className="mb-4">Új termék létrehozása</h2>
        <CreateNewProductForm />
      </div>
    </section>
  );
}

export default CreateNewProduct;
