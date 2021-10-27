import React, {useState, useEffect} from 'react';
import ShowItem from '../showItem/ShowItem';

const Shows = () => {
  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTY1YWVjNTQ3NTUwMjIwNTE0MTA5ZjYiLCJpYXQiOjE2MzQ4NDYxMTcsImV4cCI6MTYzNTQ1MDkxN30.pVTcMKi7dtKwLk3c3_RaVFEFn8l0W_xg2RmGW5TCo5Q';
    const url = '/shows';
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          throw Error('Could not fetch the data from that resource');
        }

        return res.json();
      })
      .then((data) => {
        setShows(data.shows);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  }, []);

  return (
    <div>
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {shows && shows.map((show) => <ShowItem key={show.id} item={show} />)}
    </div>
  );
};

export default Shows;
