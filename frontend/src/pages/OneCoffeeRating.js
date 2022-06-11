/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Rating from "react-rating";
import OneCoffee from "../components/OneCoffee";
import UserRating from "../components/UserRating";
import Section from "../components/Section";
import { useAuthContext } from "../helper/AuthContext";
import {
  getOneCoffeeRating,
  createNewRating,
  updateScoring,
} from "../helper/utils";
import coffeeIconColor from "../assets/icons/coffee-cup-rating-color.png";
import coffeeIconOpacity from "../assets/icons/coffee-cup-rating-opacity.png";
import useFetch from "../helper/useFetch";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

function OneCoffeeRating() {
  const { productId } = useParams();
  let { response, loading, error } = useFetch(`/coffees/${productId}`);
  const [data, setData] = useState({});
  // const [response, setResponse] = useState({});
  // const [coffee, setCoffee] = useState({});
  // const [ratings, setRatings] = useState([]);
  const [scoring, setScoring] = useState([]);
  const { loggedInUser } = useAuthContext();
  const [formData, setFormData] = useState({
    productId,
    user: loggedInUser.userId,
    ratingNumber: 0,
    comment: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();

    const result = await createNewRating(productId, formData);
    if (result.status === 200) {
      updateScoringData();
      const result = await updateScoring(productId, scoring);
      console.log(result);

      // response, loading, error = useFetch("/coffees");
      // getData();
    }

    setFormData({
      productId,
      user: loggedInUser.userId,
      ratingNumber: 0,
      comment: "",
    });

    event.target.reset();
    setFormData((formData) => ({
      ...formData,
      ratingNumber: 0,
    }));
  }

  console.log(response);

  function updateScoringData() {
    // setScoring({
    //   ...scoring,
    //   ratingNumber: scoring.ratingNumber + 1,
    // });
  }

  function handleRatingChange(value) {
    setFormData((formData) => ({
      ...formData,
      ratingNumber: value,
    }));
  }

  function handleTextareaChange(event) {
    setFormData((formData) => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  }

  // async function getData() {
  //   const oneProduct = await getOneCoffeeRating(productId);
  //   setCoffee(oneProduct.oneCoffee.coffee);
  //   setScoring(oneProduct.oneCoffee.scoring)
  //   setRatings(oneProduct.oneCoffee.rating);
  // }

  async function useFetchHook() {
    const { response, loading, error } = await useFetch(`/coffees/${productId}`);
    // setCoffee(oneProduct.oneCoffee.coffee);
    setScoring(response)
    // setRatings(oneProduct.oneCoffee.rating);
  }

  useEffect(() => {
    // getData();
    useFetchHook();
  }, []);

  // useEffect(() => {
  //   response && setScoring(response.rating);
  // }, []);

  console.log(scoring);
  // console.log(response)

  return (
    <div></div>
    // <>
    //   {/* {loading && <Loading />}
    //   {error && <ErrorMessage />} */}

    //   {response && (
    //     <>
    //       <button className="btn btn-primary ms-5 mt-4" type="button">
    //         <Link to="/coffees" className="link">
    //           Vissza a kávékhoz
    //         </Link>
    //       </button>
    //       <OneCoffee
    //         productName={response.coffee.name}
    //         productRating={response.scoring?.average}
    //         ratingNumber={response.scoring?.ratingNumber}
    //         brand={response.coffee.brand}
    //         type={response.coffee.type}
    //         ingredient={response.coffee.ingredient}
    //         productDescription={response.coffee.description}
    //       />
    //       <h2 className="p-4 ps-5">Vélemények:</h2>
    //       {response && response.rating?.length === 0 ? (
    //         <div className="card w-75 rating-card">
    //           <p>Ez a termék még nem kapott értékelést</p>
    //         </div>
    //       ) : (
    //         response.rating?.map((oneRating) => (
    //           <UserRating
    //             key={oneRating._id}
    //             user={oneRating.user}
    //             ratingNumber={oneRating.ratingNumber}
    //             comment={oneRating.comment}
    //           />
    //         ))
    //       )}
    //       {loggedInUser?.userId ? (
    //         <section>
    //           <h2>A Te értékelésed:</h2>
    //           <form onSubmit={handleSubmit}>
    //             <Rating
    //               emptySymbol={
    //                 <img
    //                   src={coffeeIconOpacity}
    //                   alt="low opacity coffee icon"
    //                   className="icon"
    //                 />
    //               }
    //               fullSymbol={
    //                 <img
    //                   src={coffeeIconColor}
    //                   alt="colorful coffee icon"
    //                   className="icon"
    //                 />
    //               }
    //               onChange={handleRatingChange}
    //               initialRating={formData.ratingNumber}
    //             />
    //             <div className="form-group">
    //               <textarea
    //                 className="form-control mx-sm-3"
    //                 name="comment"
    //                 onChange={handleTextareaChange}
    //               />
    //             </div>
    //             <button className="btn btn-primary mt-4">Küldés</button>
    //           </form>
    //         </section>
    //       ) : (
    //         <Section
    //           mainText="Szeretnéd elmondani a véleményed? "
    //           smallerText="Regisztráció után megteheted"
    //           path="/register"
    //           btnText="Irány a regisztráció"
    //         />
    //       )}
    //     </>
    //   )}
    // </>
  );
}

export default OneCoffeeRating;
