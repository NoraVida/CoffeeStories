import React from 'react';
import NewProductForm from '../components/NewProductForm';
// import { registerNewUser } from '../helper/utils';
// import '../scss/Register.scss';
import { submitForm } from '../helper/utils';

function NewProduct() {
  return (
    <section className="form--background">
      <div className="card p-5 form--container">
        <h2 className="mb-4">Új termék létrehozása</h2>
        <NewProductForm fetchFn={submitForm} />
      </div>
    </section>
  );
}

export default NewProduct;
