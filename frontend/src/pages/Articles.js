import React, { useEffect, useState } from 'react';
import useFetch from 'use-http';

import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import Article from '../components/Article';

export default function Articles() {
  const [data, setData] = useState({});

  const {
    request, response, loading, error,
  } = useFetch(`${process.env.REACT_APP_BACKEND_URI}`);

  async function getData() {
    const result = await request.get('/articles');
    setData(result);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loading && <Loading />}
      {error && <ErrorMessage />}

      {response && data.articles?.length === 0 ? (
        <section className="form--background">
          <div className="card w-75 rating-card">
            <p>Jelenleg nincs elérhető cikkek</p>
          </div>
        </section>
      ) : (
        data.articles?.map((article) => (
          <Article
            key={article._id}
            title={article.title}
            content={article.content}
            date={article.publish_date}
          />
        ))
      )}
    </>
  );
}
