/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Rating from 'react-rating';
import OneCoffee from '../components/OneCoffee';
import UserRating from '../components/UserRating';
import { useAuthContext } from '../helper/AuthContext';
import { getOneCoffeeRating, createNewRating } from '../helper/utils';
import coffeeIconColor from '../assets/icons/coffee-cup-rating-color.png';
import coffeeIconOpacity from '../assets/icons/coffee-cup-rating-opacity.png';

function OneCoffeeRating(
  // fetchOneProduct = getOneCoffeeRating,
) {
  const [coffee, setCoffee] = useState({});
  const [ratings, setRatings] = useState([]);
  const { loggedInUser } = useAuthContext();
  const { productId } = useParams();
  const [formData, setFormData] = useState({
    productId,
    userName: loggedInUser.name,
    ratingNumber: 0,
    comment: "",
  });

  const submitForm = async (formData) => {
    // const result = await fetchFn(formData);
    // if (result.status === 200) {
    //   setTimeout(() => {
    //     reset();
    //   }, 2000);
    // }
  };

  console.log(loggedInUser)

  async function handleSubmit(event) {
    event.preventDefault();

    const result = await createNewRating(productId, formData);
    if (result.status === 200) {
      // setTimeout(() => {
      //   reset();
      // }, 2000);
      console.log('okay')
    }

      setFormData({});

      event.target.reset();
      setFormData((formData) => ({
        ...formData,
        'ratingNumber': 0,
      }));
  }

  function handleRatingChange(value) {
    setFormData((formData) => ({
      ...formData,
      'ratingNumber': value,
    }));
  }

  function handleTextareaChange(event) {
    setFormData((formData) => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  }

  async function getData() {
    const OneProduct = await getOneCoffeeRating(productId);
    setCoffee(OneProduct.oneCoffee.coffee);
    setRatings(OneProduct.oneCoffee.rating);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Link to="/coffees">Vissza a kávékhoz</Link>
      <OneCoffee
        productName={coffee.name}
        productRating={coffee.rating}
        ratingNumber={coffee.ratingNumber}
        productDescription={coffee.description}
      />
      <h2 className="p-4">Vélemények:</h2>
      {ratings?.map((rating) => (
        <UserRating
          key={rating._id}
          userName={rating.userName}
          ratingNumber={rating.ratingNumber}
          comment={rating.comment}
        />
      ))}
      {loggedInUser?.userId ? (
        <section>
          <h2>A Te értékelésed:</h2>
          <form onSubmit={handleSubmit}>
            <Rating
              emptySymbol={<img src={coffeeIconOpacity} alt="low opacity coffee icon" className="icon" />}
              fullSymbol={<img src={coffeeIconColor} alt="colorful coffee icon" className="icon" />}
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
            <button className="btn btn-primary mt-4" >Küldés</button>
          </form>
        </section>
      ) : (
        <section>
          <div>
            Szeretnéd elmondani a véleményed? Regisztráció után megteheted
          </div>
          <button className="btn btn-primary mt-5" type="button">
            <Link className="link" to="/register">
              Irány a regisztráció
            </Link>
          </button>
        </section>
      )}
    </>
  );
}

export default OneCoffeeRating;
