import hollywood from './images/hollywood.jpg'
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

import SearchBar from './SearchBar';

const TMDB_TOKEN = `${process.env.REACT_APP_TMDB_API_KEY}`
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
    console.log(String(options.headers.Authorization))
    console.log(TMDB_TOKEN)
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

  // eslint-disable-next-line
  useEffect( () => fetchTrendingActor(), [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={hollywood} className="App-logo" alt="logo" />
      </header>
      <main>
        <p>
          Today's Trending Actors: {trendingActor}
        </p>
        <SearchBar/>
      </main>
      <footer className="App-footer">
      This product uses the TMDB API but is not endorsed or certified by TMDB.
      </footer>
    </div>
  );
}

export default App;
