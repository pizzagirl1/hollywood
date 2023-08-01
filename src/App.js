import hollywood from './images/hollywood.jpg'
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

import SearchBar from './components/SearchBar';
import ActorList from './components/ActorList';

const TMDB_TOKEN = `${process.env.REACT_APP_TMDB_API_KEY}`
const TMDB_URL = 'https://api.themoviedb.org/3'

function App() {
  const defaultSearchResult = { name: '', id: '', imagePath:''};
  const [searchResult, setSearchResult] = useState(defaultSearchResult);

  const [popularActors, setPopularActors] = useState([])
  const [testThree, setTestThree] = useState([])

    // eslint-disable-next-line
    useEffect( () => fetchPopularActors(), [])

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
    .then( (response) => {
      console.log(response.data.results[0].profile_path);
      return {
      id: response.data.results[0].id,
      name: response.data.results[0].name,
      imagePath: response.data.results[0].profile_path,
    }})
    .catch( (error) => {
      if (error.message.includes('undefined')) {
        window.alert('Search not valid. Try again.');
        return {
          name: '',
          id: 0
        };
      } else {
      console.log("Error Searching for Actor", query, error.message)}})
  }

  const fetchPopularActors = () => {
    const getPopularActors = (page) => {
      const convertFromAPI = (person) => {
        return {
          id: person.id,
          name: person.name,
          gender: (person.gender === (1 || 3) ) ? true : false,
          imagePath: person.profile_path
        }}

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

    const fetchAllPopularPeople = () => {
      let actorData = []
      for (let i = 1; i <= 50; i++) {
        getPopularActors(i)
        .then( (response) => {
          actorData.push(...response); 
        })
      }
      
      // const isMarginalizedGender = (actor) => {
      //   return actor.gender;
      // }

      // const bechdelData = actorData.filter(isMarginalizedGender);
      // const bechdelData = actorData.splice(0, 3);
      // console.log(bechdelData);
      // return bechdelData;
      console.log(actorData);
      return actorData;
    }
    setPopularActors(fetchAllPopularPeople())
  };
  
  const startGame = () => {
    console.log("Let the games begin!");
    setTestThree(getThreePeople(popularActors));
    console.log(testThree)
  }

  const getThreePeople = (people) => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      let randomIndex = Math.floor(Math.random() * people.length);
      result.push(people[randomIndex]);
    }
    return result;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={hollywood} className="App-logo" alt="logo" />
      </header>
      <main>
        <button onClick={startGame}>Start Game</button>
        {testThree.length > 0 && <ActorList actors={testThree}/>}
        <SearchBar 
          searchActor={searchActor}
          searchResult={searchResult}
          setSearchResult={setSearchResult}
        />
        {searchResult.name !== '' && 
        <ActorList actors={[searchResult]}/>}
        <div>
        This product uses the TMDB API but is not endorsed or certified by TMDB.
        </div>
      </main>
      {/* <footer className="App-footer">
      This product uses the TMDB API but is not endorsed or certified by TMDB.
      </footer> */}
    </div>
  );
}

export default App;
