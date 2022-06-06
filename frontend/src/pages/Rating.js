import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RatingOneCoffee from '../components/RatingOneCoffee';
// import { useAuthContext } from '../helper/AuthContext';
import { getOneCoffeeRating } from '../helper/utils';

function Rating(
  // fetchOneProduct = getOneCoffeeRating,
  // AuthContextFn = useAuthContext,
) {
  const [product, setProduct] = useState([]);
  // const { loggedInUser } = AuthContextFn();
  const { productId } = useParams();

  async function getData() {
    const OneProduct = await getOneCoffeeRating(productId);
    setProduct(OneProduct.oneCoffee);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <RatingOneCoffee
        productName={product.name}
        productRating={product.rating}
        ratingNumber={product.ratingNumber}
        productDescription={product.description}
      />
      <h2 className="p-4">Vélemények:</h2>
    </>
  );
}
// {loggedInUser?.userId ? (
//   <section>
//     <h2>A Te értékelésed:</h2>
//   </section>
// ) : (
//   <section>
//     <div>
//       Szeretnéd elmondani a véleményed? Regisztráció után megteheted
//     </div>
//     <button className="btn btn-primary mt-5" type="button">
//       <Link className="link" to="/register">
//         Irány a regisztráció
//       </Link>
//     </button>
//   </section>
// )}

export default Rating;
