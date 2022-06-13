import React from 'react';

import NewProductForm from '../components/NewProductForm';

export default function NewProduct() {
  return (
    <section className="form--background">
      <div className="card p-5 form--container">
        <h2 className="mb-4">Új termék létrehozása</h2>
        <NewProductForm />
      </div>
    </section>
  );
}
