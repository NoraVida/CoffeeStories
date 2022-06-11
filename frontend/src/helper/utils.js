import jwt from 'jsonwebtoken';
import { useState } from 'react';

export const getDataFromToken = (token) => {
  return jwt.decode(token);
};

export const submitForm = async (path, method, formData) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}${path}`,
      {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      },
    );
    const result = await response.json();
    result.status = response.status;
    return result;
  } catch {
    const result = {
      status: 500,
      message:
        'Network error, server is unavailable. Registration failed!',
    };
    return result;
  }
};

// export const registerNewUser = async (formData) => {
//   try {
//     const response = await fetch(
//       `${process.env.REACT_APP_BACKEND_URI}/register`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name: formData.name,
//           email: formData.email,
//           password: formData.password,
//         }),
//       },
//     );
//     const result = await response.json();
//     result.status = response.status;
//     return result;
//   } catch {
//     const result = {
//       status: 500,
//       message:
//         'Network error, server is unavailable. Registration failed!',
//     };
//     return result;
//   }
// };

// export const loginUser = async (formData) => {
//   try {
//     const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     });
//     const result = await response.json();
//     result.status = response.status;
//     return result;
//   } catch {
//     const result = {
//       status: 500,
//       message:
//         'Network error, server is unavailable. Login failed!',
//     };
//     return result;
//   }
// };

export async function getCoffees() {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}/coffees`,
    );
    const result = await response.json();
    return result;
  } catch {
    const result = {
      errorMessage:
        'Network error, server is not available.',
    };
    return result;
  }
}

// try to write fetch
export async function tryFetch(path) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const url = `${process.env.REACT_APP_BACKEND_URI}${path}`;

  try {
    const res = await fetch(url);
    const json = await res.json();
    setResponse(json);
  } catch (err) {
    setError(err);
  } finally {
    setLoading(false);
  }
  const vmi = { response, error, loading };

  // return { response, error, loading };
  return vmi;
}

export async function getOneCoffeeRating(productId) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}/coffees/${productId}`,
    );
    const result = await response.json();
    return result;
  } catch {
    const result = {
      errorMessage:
        'Network error, server is not available.',
    };
    return result;
  }
}

export const createNewRating = async (productId, formData) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}/coffees/${productId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: formData.productId,
          user: formData.user,
          ratingNumber: formData.ratingNumber,
          comment: formData.comment,
        }),
      },
    );
    const result = await response.json();
    result.status = response.status;
    return result;
  } catch {
    const result = {
      status: 500,
      message:
        'Network error, server is unavailable.',
    };
    return result;
  }
};

export const updateScoring = async (productId, scoringState) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}/coffees/${productId}`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          // productRating: scoringState.productRating,
          ratingNumber: scoringState.ratingNumber,
        }),
      },
    );
    const result = await response.json();
    result.status = response.status;
    return result;
  } catch {
    const result = {
      status: 500,
      message:
        'Network error, server is unavailable.',
    };
    return result;
  }
};

export const createNewProduct = async (formData) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}/createnewproduct`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      },
    );
    const result = await response.json();
    result.status = response.status;
    return result;
  } catch {
    const result = {
      status: 500,
      message:
        'Network error, server is unavailable.',
    };
    return result;
  }
};
