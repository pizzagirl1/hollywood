import hollywood from './images/hollywood.jpg'
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

const TMDB_TOKEN = `${process.env.TMDB_API_KEY}`
const TMDB_URL = 'https://api.themoviedb.org/3'

function App() {

  const [trendingActor, setTrendingActor] = useState()

  const getTrendingActor = () => {
    const convertFromAPI = (person) => {return person.name};

    const options = {
      method: 'GET',
      url: `${TMDB_URL}/trending/person/day`,
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + TMDB_TOKEN
      }
    };

    return axios
      .request(options)
      .then(function (response) {
        return response.data.results.map(convertFromAPI)
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }
  
  const fetchTrendingActor = () => {
    getTrendingActor().then( (response) => setTrendingActor(response))
  };

  useEffect( () => fetchTrendingActor(), [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={hollywood} className="App-logo" alt="logo" />
        <p>
          Today's Trending Actors: {trendingActor}
        </p>
      </header>
      <footer>
      This product uses the TMDB API but is not endorsed or certified by TMDB.
      </footer>
    </div>
  );
}

export default App;
