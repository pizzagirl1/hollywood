import hollywood from './images/hollywood.jpg'
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

import SearchBar from './SearchBar';

const TMDB_TOKEN = `${process.env.REACT_APP_TMDB_API_KEY}`
const TMDB_URL = 'https://api.themoviedb.org/3'

function App() {

  const [trendingActor, setTrendingActor] = useState()

    // eslint-disable-next-line
    useEffect( () => fetchTrendingActor(), [])
  
  const fetchTrendingActor = () => {
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
          return response.data.results.map(convertFromAPI)})
        .catch(function (error) {
          console.log(error.message);});
    }

    getTrendingActor().then( (response) => setTrendingActor(response))
  };

  const searchActor = (query) => {
    const options = {
      method: 'GET',
      url: `${TMDB_URL}/search/person`,
      params: {query: query},
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + TMDB_TOKEN
      }
    };

    return axios
    .request(options)
    .then( (response) => console.log(response.data.results[0].name))
    .catch( (error) => console.log("Error Searching for Actor", query, error.message))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={hollywood} className="App-logo" alt="logo" />
      </header>
      <main>
        <p>
          Today's Trending Actors: {trendingActor}
        </p>
        <SearchBar searchActor={searchActor}/>
      </main>
      <footer className="App-footer">
      This product uses the TMDB API but is not endorsed or certified by TMDB.
      </footer>
    </div>
  );
}

export default App;
