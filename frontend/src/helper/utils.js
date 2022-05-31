// import jwt from 'jsonwebtoken';

// export const getDataFromToken = (token) => {
//   return jwt.decode(token);
// };

export const registerNewUser = async (formData) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
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
        'Network error, server is unavailable. Registration failed!',
    };
    return result;
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    result.status = response.status;
    return result;
  } catch {
    const result = {
      status: 500,
      message:
        'Network error, server is unavailable. Login failed!',
    };
    return result;
  }
};

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
};
