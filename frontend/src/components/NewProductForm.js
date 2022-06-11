/*eslint-disable*/
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { createNewProduct } from "../helper/utils";
// import '../scss/Register.scss';

export default function NewProductForm({ fetchFn, setLoggedInUser }) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    reValidateMode: "onChange",
    criteriaMode: "all",
    shouldFocusError: true,
  });
  const navigate = useNavigate();

  const submitForm = async (formData) => {
    const result = await fetchFn('/createnewproduct', 'post', formData);
    if (result.status === 200) {
      navigate('/coffees');
    } 
    //else {
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
          className={`form-control mt-2 ${errors.name ? "is-invalid" : ""}`}
          placeholder="Termék neve"
          id="name"
          {...register("name", {
            required: "A név megadása kötelező",
          })}
        />
        <div className="invalid-feedback">
          {errors.name ? errors.name.message : ""}
        </div>
      </div>
      <div className="form-group">
        <input
          type="text"
          name="brand"
          className={`form-control mt-2 ${errors.brand ? "is-invalid" : ""}`}
          placeholder="Termék márkája"
          id="brand"
          {...register("brand", {
            required: "A márka megadása kötelező",
          })}
        />
        <div className="invalid-feedback">
          {errors.brand ? errors.brand.message : ""}
        </div>
      </div>
      <select
        name="type"
        className={`form-select mt-2 ${errors.brand ? "is-invalid" : ""}`}
        {...register("type", {
          required: "A típus kiválasztása kötelező",
        })}
      >
        <option value="">Válassz!</option>
        <option value="szemes">szemes</option>
        <option value="őrölt">őrölt</option>
        <option value="instant">instant</option>
      </select>
      <div className="invalid-feedback">
        {errors.type ? errors.type.message : ""}
      </div>
      <div className="form-group">
        <input
          type="text"
          name="ingredient"
          className={`form-control mt-2 ${
            errors.ingredient ? "is-invalid" : ""
          }`}
          placeholder="Összetétele"
          id="ingredient"
          {...register("ingredient", {
            required: "Az összetétel megadása kötelező",
          })}
        />
        <div className="invalid-feedback">
          {errors.ingredient ? errors.ingredient.message : ""}
        </div>
      </div>
      <div className="form-group">
        <textarea
          className={`form-control mt-2 ${
            errors.description ? "is-invalid" : ""
          }`}
          name="description"
          placeholder="Termékleírás"
          {...register("description", {
            required: "A leírás megadása kötelező",
          })}
        />
        <div className="invalid-feedback">
          {errors.description ? errors.description.message : ""}
        </div>
      </div>

      <button className="btn btn-primary mt-4" type="submit" value="Submit">
        Küldés
      </button>
    </form>
  );
}
