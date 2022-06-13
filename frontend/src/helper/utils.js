import jwt from 'jsonwebtoken';

export const getDataFromToken = (token) => {
  return jwt.decode(token);
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem('coffeeStoriesToken');
};
