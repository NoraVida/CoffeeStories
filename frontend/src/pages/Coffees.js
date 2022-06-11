/*eslint-disable*/
import React, { useEffect } from 'react';
import Coffee from '../components/Coffee';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import Section from '../components/Section';
import { useAuthContext } from '../helper/AuthContext';
import useFetch from '../helper/useFetch';

function Coffees() {
  const {
    executeFetch, response, loading, error,
  } = useFetch('/coffees', null, { immediate: false });
  const { loggedInUser } = useAuthContext();

  async function getData() {
    const data = await executeFetch();
    console.log(data)
    // setCoffee(oneProduct.oneCoffee.coffee);
    // setScoring(oneProduct.oneCoffee.scoring)
    // setRatings(oneProduct.oneCoffee.rating);
  }

  useEffect(() => {
    getData();
  }, []);

  console.log(response)

  return (
    <>
      {loading && <Loading />}
      {error && <ErrorMessage />}

      {response && (
        <>
          <div className="coffee-container pt-3">
            {response?.coffees.coffee.map((product) => (
              <Coffee
                key={product._id}
                productId={product._id}
                productName={product.name}
                // productRating={product.rating}
                // ratingNumber={product.ratingNumber}
                productDescription={product.description}
              />
            ))}
          </div>
          {loggedInUser?.userId ? (
            <Section
              mainText="Nem találod a keresett kávét?"
              smallerText="Egészítsd ki a listát"
              path="/createnewproduct"
              btnText="Új kávé hozzáadása"
            />
          ) : (
            <Section
              mainText="Szeretnél új kávét hozzáadni a listához?"
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

export default Coffees;
