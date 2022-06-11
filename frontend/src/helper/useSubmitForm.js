/*eslint-disable*/
import { useState } from 'react';

const useSubmitForm = (path, method) => {
  const [status, setStatus] = useState('idle');
  const [responseData, setData] = useState([]);

  const url = `${process.env.REACT_APP_BACKEND_URI}${path}`;

  const fetchData = async (formData) => {
    setStatus('fetching');

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const json = await response.json();
      const result = await response.json();
      result.status = response.status;
      return result;

      setData(json);
      setStatus('fetched');
    } catch (err) {
      setData(err);
      setStatus('failed');
    }
  };

  return [fetchData, status, responseData];
};

export default useSubmitForm;
