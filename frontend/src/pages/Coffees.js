import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Coffee from '../components/Coffee';
import { useAuthContext } from '../helper/AuthContext';
import { getCoffees } from '../helper/utils';
// import LoginForm from '../components/LoginForm';
// import { loginUser } from '../helper/utils';

function Coffees({
  fetchProducts = getCoffees,
  AuthContextFn = useAuthContext,
}) {
  const [data, setData] = useState([]);
  const { loggedInUser } = AuthContextFn();

  async function getData() {
    const allProducts = await fetchProducts();
    setData(allProducts);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {data.coffees?.map((product) => (
        <Coffee
          key={product._id}
          productId={product._id}
          productName={product.name}
          productRating={product.rating}
          ratingNumber={product.ratingNumber}
          productDescription={product.description}
        />
      ))}
      {loggedInUser?.userId ? (
        <section className="section-bottom">
          <div>Szeretnél új kávét hozzáadni a listához? Regisztráció után megteheted</div>
          <button className="btn btn-primary mt-5" type="button">
            <Link className="link" to="/register">
              Irány a regisztráció
            </Link>
          </button>
        </section>
      ) : (
        <section>
          <div>Nem találod a keresett kávét? Egészítsd ki a listát</div>
          <button className="btn btn-primary mt-5" type="button">
            <Link className="link" to="/register">
              Új kávé hozzáadása
            </Link>
          </button>
        </section>
      )}
    </>
  );
}

export default Coffees;
