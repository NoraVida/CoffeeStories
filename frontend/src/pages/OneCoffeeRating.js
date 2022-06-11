/*eslint-disable*/
import React, { useCallback, useState, useEffect, useRef } from "react";
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
// import useFetch from "../helper/useFetch";
import { tryFetch } from "../helper/utils";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import useFetch from 'use-http'

function OneCoffeeRating() {
  const { productId } = useParams();
  // let { response, loading, error } = useFetch(`/coffees/${productId}`);
  // const {
  //   executeFetch, response, loading, error,
  // } = useFetch(`/coffees/${productId}`, null, { immediate: false });

  const [coffee, setCoffee] = useState({});
  const [ratings, setRatings] = useState([]);
  const [scoring, setScoring] = useState([]);
  // const options = {};
  const { get, post, response, loading, error } = useFetch(`http://localhost:8080/api/`,{
    cache: "no-cache"
  })

  // const [response, setResponse] = useState({});
  const { loggedInUser } = useAuthContext();
  const [formData, setFormData] = useState({
    productId,
    user: loggedInUser.userId,
    ratingNumber: 0,
    comment: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();

    // const result = await createNewRating(productId, formData);
    // if (result.status === 200) {
    //   console.log('console')
      
    //   // const result = await updateScoring(productId, scoring);
    //   // console.log(result);

    //   // response, loading, error = useFetch("/coffees");
    //   // getData();
    //   // response, loading, error = useFetch(`/coffees/${productId}`);

    // }
    const newTodo = await post(`/coffees/${productId}`, formData)
    if (response.ok) {
      updateScoringData();
      // getData();
      // fetchData();
      const { get, post, response, loading, error } = useFetch(`http://localhost:8080/api/`,{
      cache: "no-cache"
      })
      const data = await get(`/coffees/${productId}`)
      if (response.ok) {
      setCoffee(data.coffee)
      setScoring(data.scoring)
      setRatings(data.rating)
      }
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

  // console.log(response);

  function updateScoringData() {
    setScoring({
      ...scoring,
      ratingNumber: scoring.ratingNumber + 1,
    });
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
  //   response = await tryFetch(`/coffees/${productId}`);
  //   console.log(response)
  //   // setCoffee(oneProduct.oneCoffee.coffee);
  //   // setScoring(oneProduct.oneCoffee.scoring)
  //   // setRatings(oneProduct.oneCoffee.rating);
  // }

  // async function useFetchHook() {
  //   const { response, loading, error } = await useFetch(`/coffees/${productId}`);
  //   // setCoffee(oneProduct.oneCoffee.coffee);
  //   setScoring(response)
  //   // setRatings(oneProduct.oneCoffee.rating);
  // }

  async function getData() {
    const data = await get(`/coffees/${productId}`)
    if (response.ok) {
      setCoffee(data.coffee)
      setScoring(data.scoring)
      setRatings(data.rating)
    }
    // setCoffee(oneProduct.oneCoffee.coffee);
    // setScoring(oneProduct.oneCoffee.scoring)
    // setRatings(oneProduct.oneCoffee.rating);
  }

  // const fetchData = useCallback(async () => {
  //   const data = await get(`/coffees/${productId}`);
  //   if (response.ok) {
  //     setCoffee(data.coffee)
  //     setScoring(data.scoring)
  //     setRatings(data.rating)
  //   }
  //   console.log(data);
  // }, [get]);

  // useEffect(() => {
  //   getData();
  //   // fetchData();
  //   // useFetchHook();
  //   // tryFetch()
  // }, []);

  const mounted = useRef(false)
  useEffect(() => { // componentDidMount
    if (!mounted.current) {
      getData();
      mounted.current = true
    }
  }, [])

  // console.log(coffee)

  // useEffect(() => {
  //   response && setScoring(response.rating);
  // }, []);

  // console.log(response)

  return (
    <>

      {loading && <Loading />}
      {error && <ErrorMessage />}


      {response && (
        <>
          <button className="btn btn-primary ms-5 mt-4" type="button">
            <Link to="/coffees" className="link">
              Vissza a kávékhoz
            </Link>
          </button>
          <OneCoffee
            productName={coffee.name}
            productRating={scoring?.average}
            ratingNumber={scoring?.ratingNumber}
            brand={coffee.brand}
            type={coffee.type}
            ingredient={coffee.ingredient}
            productDescription={coffee.description}
          />
          <h2 className="p-4 ps-5">Vélemények:</h2>
          {ratings && ratings?.length === 0 ? (
            <div className="card w-75 rating-card">
              <p>Ez a termék még nem kapott értékelést</p>
            </div>
          ) : (
            ratings?.map((oneRating) => (
              <UserRating
                key={oneRating._id}
                user={oneRating.user}
                ratingNumber={oneRating.ratingNumber}
                comment={oneRating.comment}
              />
            ))
          )}
          {loggedInUser?.userId ? (
            <section>
              <h2>A Te értékelésed:</h2>
              <form onSubmit={handleSubmit}>
                <Rating
                  emptySymbol={
                    <img
                      src={coffeeIconOpacity}
                      alt="low opacity coffee icon"
                      className="icon"
                    />
                  }
                  fullSymbol={
                    <img
                      src={coffeeIconColor}
                      alt="colorful coffee icon"
                      className="icon"
                    />
                  }
                  onChange={handleRatingChange}
                  initialRating={formData.ratingNumber}
                />
                <div className="form-group">
                  <textarea
                    className="form-control mx-sm-3"
                    name="comment"
                    onChange={handleTextareaChange}
                  />
                </div>
                <button className="btn btn-primary mt-4">Küldés</button>
              </form>
            </section>
          ) : (
            <Section
              mainText="Szeretnéd elmondani a véleményed? "
              smallerText="Regisztráció után megteheted"
              path="/register"
              btnText="Irány a regisztráció"
            />
          )}
        </>
      )}
    </>
  );
}

export default OneCoffeeRating;
