import React from 'react';
import CreateNewProductForm from '../components/CreateNewProductForm';
// import { registerNewUser } from '../helper/utils';
// import '../scss/Register.scss';

function CreateNewProduct() {
  return (
    <section className="form--background">
      <div className="card p-5 form--container">
        <h2 className="mb-4">Új termék létrehozása</h2>
        <CreateNewProductForm />
      </div>
    </section>
  );
}

export default CreateNewProduct;
