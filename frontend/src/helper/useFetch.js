/*eslint-disable*/
import { useCallback, useEffect, useState } from 'react';

const useFetch = (path, options, { immediate }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const url = `${process.env.REACT_APP_BACKEND_URI}${path}`;

  const executeFetch = useCallback(async () => {
    setLoading(true);
    setResponse(null)
    setError(null)
    try {
      const res = await fetch(url, options);
      const json = await res.json();
      setResponse(json);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url, options, response, error, loading]);

  useEffect(() => {
    if (immediate) {
      executeFetch()
    }
  }, [executeFetch, immediate])

  return { response, error, loading, executeFetch }


// EZ AZ EREDI - JÓL MŰKÖDŐ ---- >
// const useFetch = (path, options) => {
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const url = `${process.env.REACT_APP_BACKEND_URI}${path}`;

//   useEffect(() => {
//     const doFetch = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(url, options);
//         const json = await res.json();
//         setResponse(json);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     doFetch();
//   }, []);

// const useFetch = (path, method) => {
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const url = `${process.env.REACT_APP_BACKEND_URI}${path}`;

//   const doFetch = async () => {
//     setLoading(true);

//     try {
//       const res = await fetch(url, {method});
//       const json = await res.json();
//       setResponse(json);

//     } catch (err) {
//       setError(err);

//     } finally {
//       setLoading(false);
//     }
//   };

//   return [doFetch, response, error, loading];
// };

  // return { response, error, loading };
};

export default useFetch;
