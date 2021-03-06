import React, { useEffect, useState } from 'react';
import useFetch from 'use-http';

import Coffee from '../components/Coffee';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import Section from '../components/Section';

import { useAuthContext } from '../helper/AuthContext';

function Coffees() {
  const { loggedInUser } = useAuthContext();
  const [data, setData] = useState({});

  const {
    request, response, loading, error,
  } = useFetch(`${process.env.REACT_APP_BACKEND_URI}`);

  async function getData() {
    const result = await request.get('/coffees');
    setData(result);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loading && <Loading />}
      {error && <ErrorMessage />}

      {response && data.coffees?.length === 0 ? (
        <section className="form--background">
          <div className="card w-75 rating-card">
            <p>Jelenleg nincs megjeleníthető kávék</p>
          </div>
        </section>
      ) : (
        <>
          <div className="coffee-container pt-3">
            {data.coffees?.coffee.slice(0).reverse().map((product) => (
              <Coffee
                key={product._id}
                productId={product._id}
                productName={product.name}
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
