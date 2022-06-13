import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetch from 'use-http';
import Rating from 'react-rating';

import OneCoffee from '../components/OneCoffee';
import UserRating from '../components/UserRating';
import Section from '../components/Section';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

import { useAuthContext } from '../helper/AuthContext';
import { getTokenFromLocalStorage } from '../helper/utils';
import coffeeIconColor from '../assets/icons/coffee-cup-rating-color.png';
import coffeeIconOpacity from '../assets/icons/coffee-cup-rating-opacity.png';

import '../scss/Coffee.scss';

export default function OneCoffeeRating() {
  const { productId } = useParams();
  const { loggedInUser } = useAuthContext();

  const [coffee, setCoffee] = useState({});
  const [ratings, setRatings] = useState([]);
  const [scoring, setScoring] = useState([]);

  const options = {
    headers: {
      'Content-Type': 'application/json',
      ...(getTokenFromLocalStorage() && { Authorization: `Bearer ${getTokenFromLocalStorage()}` }),
    },
  };

  const {
    request, response, loading, error,
  } = useFetch(`${process.env.REACT_APP_BACKEND_URI}`, options);

  const [formData, setFormData] = useState({
    productId,
    user: loggedInUser.userId,
    ratingNumber: 0,
    comment: '',
  });

  async function handleSubmit(event) {
    event.preventDefault();

    const newData = await request.post(`/coffees/${productId}`, formData);
    if (response.ok) {
      setCoffee(newData.coffee);
      setScoring(newData.scoring);
      setRatings(newData.rating);
    }

    setFormData({
      productId,
      user: loggedInUser.userId,
      ratingNumber: 0,
      comment: '',
    });

    event.target.reset();
    setFormData(() => ({
      ...formData,
      ratingNumber: 0,
    }));
  }

  const handleRatingChange = (value) => {
    setFormData(() => ({
      ...formData,
      ratingNumber: value,
    }));
  };

  const handleTextareaChange = (event) => {
    setFormData(() => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  };

  async function getData() {
    const data = await request.get(`/coffees/${productId}`);
    if (response.ok) {
      setCoffee(data.coffee);
      setScoring(data.scoring);
      setRatings(data.rating);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const deleteRating = async () => {
    // const updatedData = await request.delete(`/coffees/${productId}`);
    // if (response.ok) {
    //   setCoffee(updatedData.coffee);
    //   setScoring(updatedData.scoring);
    //   setRatings(updatedData.rating);
    // }
  };

  return (
    <>
      {loading && <Loading />}
      {error && <ErrorMessage />}

      {coffee.name && (
        <>
          <div className="card w-75">
            <button className="btn btn-primary" type="button">
              <Link to="/coffees" className="link">
                Vissza a kávékhoz
              </Link>
            </button>
          </div>
          <OneCoffee
            productName={coffee.name}
            productRating={scoring?.average}
            ratingNumber={scoring?.ratingNumber}
            brand={coffee.brand}
            type={coffee.type}
            ingredient={coffee.ingredient}
            productDescription={coffee.description}
          />
          {loggedInUser?.userId ? (
            // <div className="section--container mt-5 p-5">
            <div className="card w-75">
              <h2>A Te értékelésed:</h2>
              <form onSubmit={handleSubmit}>
                <Rating
                  emptySymbol={(
                    <img
                      src={coffeeIconOpacity}
                      alt="low opacity coffee icon"
                      className="icon"
                    />
                  )}
                  fullSymbol={(
                    <img
                      src={coffeeIconColor}
                      alt="colorful coffee icon"
                      className="icon"
                    />
                  )}
                  onChange={handleRatingChange}
                  initialRating={formData.ratingNumber}
                />
                <div className="form-group">
                  <textarea
                    className="form-control"
                    name="comment"
                    onChange={handleTextareaChange}
                  />
                </div>
                <button className="btn btn-primary mt-4" type="submit">Küldés</button>
              </form>
            </div>
          ) : (
            <Section
              mainText="Szeretnéd elmondani a véleményed?"
              smallerText="Regisztráció után megteheted"
              path="/register"
              btnText="Irány a regisztráció"
            />
          )}
          <h2 className="pt-5">Vélemények:</h2>
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
                onClickDelete={deleteRating}
              />
            ))
          )}
        </>
      )}
    </>
  );
}
