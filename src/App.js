import hollywood from './images/hollywood.jpg'
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

const TMDB_TOKEN = `${process.env.TMDB_API}`

const TMDB_URL = 'https://api.themoviedb.org/3'

function App() {

  const [trendingActor, setTrendingActor] = useState()

  const getActorData = (actorName) => {
    const headers = {
      accept: 'application/json',
      Authorization: 'Bearer ' + TMDB_TOKEN
    }
    return axios.get(`${TMDB_URL}/trending/person/day`, headers)
    .then( (response) => console.log(response))
    .catch( (e) => console.log(e))
  }

  const fetchTrendingActor = () => {
    getActorData().then( (response) => setTrendingActor(response))
  };

  useEffect( () => fetchTrendingActor(), [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={hollywood} className="App-logo" alt="logo" />
        <p>
          Today's Trending Actors: {trendingActor}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <footer>
      This product uses the TMDB API but is not endorsed or certified by TMDB.
      </footer>
    </div>
  );
}

export default App;
