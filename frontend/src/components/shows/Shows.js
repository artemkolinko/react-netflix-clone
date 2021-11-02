import React, {useState, useEffect, useContext} from 'react';
import './show.css';
import ShowItem from '../showItem/ShowItem';
import {AuthContext} from '../../authContext/AuthContext';

const Shows = () => {
  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    const url = '/shows';
    const options = {
      headers: {
        Authorization: `Bearer ${user.jwt_token}`,
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
    <div className='shows'>
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {shows && shows.map((show) => <ShowItem key={show.id} item={show} />)}
    </div>
  );
};

export default Shows;
