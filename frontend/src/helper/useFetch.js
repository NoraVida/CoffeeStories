import { useEffect, useState } from 'react';

const useFetch = (path, options) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const url = `${process.env.REACT_APP_BACKEND_URI}${path}`;

  useEffect(() => {
    const doFetch = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setResponse(json);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    doFetch();
  }, []);

  return { response, error, loading };
};

export default useFetch;
