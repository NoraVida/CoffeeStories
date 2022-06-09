/*eslint-disable*/
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { createNewProduct } from '../helper/utils';
// import '../scss/Register.scss';

export default function CreateNewProductForm({ fetchFn, setLoggedInUser }) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    shouldFocusError: true,
  });

  // const navigate = useNavigate();

  const submitForm = async (formData) => {
    const result = await createNewProduct(formData);
    // if (!result.error) {
    //   navigate('/coffees');
      reset();
    // } else {
    //   setError('email', {
    //     type: 'systemErrorMessage',
    //     message: result.message,
    //   });
    // }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="form-group">
        <input
          type="text"
          name="name"
          className={`form-control mt-2 ${errors.name ? 'is-invalid' : ''}`}
          placeholder="Termék neve"
          id="name"
          {...register('name', {
            required: 'A termék nevének megadása kötelező'
          })}
        />
        <div className="invalid-feedback">
          {errors.name ? errors.name.message : ''}
        </div>
      </div>
      <div className="form-group">
        <input
          type="text"
          name="brand"
          className={`form-control mt-2 ${errors.brand ? 'is-invalid' : ''}`}
          placeholder="Termék márkája"
          id="brand"
          {...register('brand', {
            required: 'A termék márkájának megadása kötelező'
          })}
        />
        <div className="invalid-feedback">
          {errors.brand ? errors.brand.message : ''}
        </div>
      </div>
      <select className="form-select mt-2" {...register("type")}>
        <option value="szemes">szemes</option>
        <option value="őrölt">őrölt</option>
        <option value="instant">instant</option>
      </select>
      <div className="form-group">
        <input
          type="text"
          name="ingredient"
          className={`form-control mt-2 ${errors.ingredient ? 'is-invalid' : ''}`}
          placeholder="Összetétele"
          id="ingredient"
          {...register('ingredient', {
            required: 'A termék összetételének megadása kötelező'
          })}
        />
        <div className="invalid-feedback">
          {errors.ingredient ? errors.ingredient.message : ''}
        </div>
      </div>
      <div className="form-group">
        <textarea 
          className="form-control mt-2" 
          name="description"
          placeholder="Termékleírás"
          // ref={register()}
        />
      </div>
      {isSubmitSuccessful && <div>Successful registration!</div>}

      <button className="btn btn-primary mt-4" type="submit" value="Submit">Küldés</button>
    </form>
  );
}
