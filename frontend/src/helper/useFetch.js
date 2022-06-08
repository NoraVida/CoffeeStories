// import { useEffect, useState } from 'react';

// const useFetch = (url) => {
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState(null);
//   const [error, setError] = useState('');

//   const fetchApi = ({ url, method, body = null, headers = null }) => {
//     fetch(url) // 'https://jsonplaceholder.typicode.com/users'
//     .then(response => {
//       return response.json()
//     })
//     .then(json => {
//       console.log(json)
//       setLoading(false)
//       setData(json)
//     })
//   };

//   useEffect(() => {
//     fetchApi();
//   }, []);

//   return { loading, data }
// };

// export default useFetch;
