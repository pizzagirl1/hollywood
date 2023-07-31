import hollywood from './images/hollywood.jpg'
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

import SearchBar from './SearchBar';
// import PopularActorsList from './PopularActorsList';

const TMDB_TOKEN = `${process.env.REACT_APP_TMDB_API_KEY}`
const TMDB_URL = 'https://api.themoviedb.org/3'

function App() {
  const defaultSearchActor = { name: '', id: ''};

  // const [trendingActor, setTrendingActor] = useState([])
  const [popularActors, setPopularActors] = useState([])
  const [searchResult, setSearchResult] = useState(defaultSearchActor);

    // eslint-disable-next-line
    useEffect( () => fetchPopularActors(), [])
    // useEffect( () => fetchNameByPersonId(popularActors[0]), [popularActors])
  
  // defunct
  // const fetchTrendingActor = () => {
  //   const getTrendingActor = () => {
  //     const convertFromAPI = (person) => {return person.name};
  
  //     const options = {
  //       method: 'GET',
  //       url: `${TMDB_URL}/trending/person/day`,
  //       headers: {
  //         accept: 'application/json',
  //         Authorization: 'Bearer ' + TMDB_TOKEN
  //       }
  //     };
  //     return axios
  //       .request(options)
  //       .then((response) => {
  //         return response.data.results.map(convertFromAPI)})
  //       .catch((error) => {
  //         console.log(error.message);});
  //   }

  //   getTrendingActor().then( (response) => setTrendingActor(response))
  // };

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
    .then( (response) => {return {
      name: response.data.results[0].name,
      id: response.data.results[0].id}})
    .catch( (error) => {
      if (error.message === 'response.data.results[0] is undefined'){
        window.alert('Search not valid. Try again.');
        return {
          name: '',
          id: 1
        };
      } else {
      console.log("Error Searching for Actor", query, error.message)}})
  }

  const fetchPopularActors = () => {
    const getPopularActors = (page) => {
      const convertFromAPI = (person) => {
        return {
          id: person.id,
          name: person.name}}

      const options = {
      method: 'GET',
      url: `${TMDB_URL}/person/popular`,
      params: {page: page},
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + TMDB_TOKEN
      }
    };
    return axios
      .request(options)
      .then((response) => {
        return response.data.results.map(convertFromAPI);})
      .catch((error) => {
        console.log("Error during getPopularActors", error.message);});
    }

    // const fetchTenPages = () => {
    //   let actorData = []
    //   for (let i = 1; i <= 50; i++) {
    //     getPopularActors(i)
    //     .then( (response) => {
    //       actorData.push(...response); 
    //       console.log(i, response);
    //     })
    //   }
    //   return actorData;
    // }

    // fetchTenPages().then( (response) => {
    //   console.log(response);
    //   setPopularActors(response);})

    getPopularActors(15)
    .then( (response) => {
      setPopularActors(response);})
  };
  
  // inshallah we dont need this
  // const fetchNameByPersonId = (id) => {
  //   const getNameByPersonId = (id) => {
  //     const options = {
  //       method: 'GET',
  //       url: `${TMDB_URL}/person/${id}`,
  //       headers: {
  //         accept: 'application/json',
  //         Authorization: 'Bearer ' + TMDB_TOKEN
  //       }
  //     };
  //     return axios
  //       .request(options)
  //       .then((response) => {return (response.data.name);})
  //       .catch((error) => {
  //         console.log("error in getNameByPersonId", error.message);});
  //     }

  //   getNameByPersonId(id).then((response) => {return response});
  // }

  const convertToNamesFromActorObjectsArray = (actorData) => {
    const onlyNames = actorData.map((actor) => {return actor.name});
    return onlyNames
  }
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={hollywood} className="App-logo" alt="logo" />
      </header>
      <main>
        <p>
          Today's Popular Actors: {(convertToNamesFromActorObjectsArray(popularActors)).join(', ')}
        </p>
        <SearchBar 
          searchActor={searchActor}
          searchResult={searchResult}
          setSearchResult={setSearchResult}
        />
        {/* <PopularActorsList
          popularActors={popularActors}
          fetchNameByPersonId={fetchNameByPersonId}
        /> */}
      </main>
      <footer className="App-footer">
      This product uses the TMDB API but is not endorsed or certified by TMDB.
      </footer>
    </div>
  );
}

export default App;
