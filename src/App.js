import hollywood from './images/hollywood.jpg'
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
// import setTimeout from 'timers/promises'

import SearchBar from './components/SearchBar';
import AssetList from './components/AssetList';
import GameSetup from './components/GameSetup';

const TMDB_TOKEN = `${process.env.REACT_APP_TMDB_API_KEY}`
const TMDB_URL = 'https://api.themoviedb.org/3'

function App() {
  const defaultEmptyActorObject = { name: '', id: '', imagePath:'', type: 'Actor'};
  const [resultFromSearch, setResultFromSearch] = useState(defaultEmptyActorObject);

  const [popularActors, setPopularActors] = useState([])
  const [chain, setChain] = useState([])

  const [startingThree, setStartingThree] = useState([])
  const [targetThree, setTargetThree] = useState([])
  const [goalActors, setGoalActors] = useState([defaultEmptyActorObject, defaultEmptyActorObject])

  const [game, setGame] = useState([false])

  // eslint-disable-next-line
  useEffect( () => fetchPopularActors(), [])
  // useEffect( () => loadGame(), [])
  
  // const loadGame = async () => {
  //   fetchPopularActors();
  //   await setTimeout(5000);
  //   rollActors();
  // }

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
      return {
        id: response.data.results[0].id,
        name: response.data.results[0].name,
        imagePath: response.data.results[0].profile_path,
        type: 'Actor'
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
          imagePath: person.profile_path,
          type: 'Actor'
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
      for (let i = 1; i <= 100; i++) {
        getPopularActors(i)
        .then( (response) => {
          actorData.push(...response); 
        })
      }
      // const isMarginalizedGender = (actor) => {
      //   return actor.gender;
      // }
      // const bechdelData = actorData.filter(isMarginalizedGender);
      // console.log(bechdelData);
      // return bechdelData;
      // console.log(actorData);
      return actorData;
    }
    setPopularActors(fetchAllPopularPeople())
    // setPopularActors(fetchAllPopularPeople().filter(isMarginalizedGender))
  };
  
  const rollActors = () => {
    const getThreePeople = (people) => {
      const result = [];
      for (let i = 0; i < 3; i++) {
        let randomIndex = Math.floor(Math.random() * people.length);
        result.push(people[randomIndex]);
      }
      return result;
    }
    setGoalActors([defaultEmptyActorObject, defaultEmptyActorObject])
    setChain([])
    setStartingThree(getThreePeople(popularActors));
    setTargetThree(getThreePeople(popularActors));
  }

  const switchGoalDirection = () => {
    setGoalActors([goalActors[1], goalActors[0]])
  }

  // const onClickImageAppendObjectToChain = (data) => {
  //   const newObject = {
  //     id: data.id,
  //     name: data.name,
  //     imagePath: data.imagePath,
  //     type: data.type
  //   }
    
  //   const newChain = [...chain, newObject]
  //   setChain(newChain)
  // }

  const onClickSetStartingActor = (data) => {
    const newObject = {
      id: data.id,
      name: data.name,
      imagePath: data.imagePath,
      type: data.type
    }
    setGoalActors([newObject, goalActors[1]])
  }

  const onClickSetTargetActor = (data) => {
    const newObject = {
      id: data.id,
      name: data.name,
      imagePath: data.imagePath,
      type: data.type
    }
    setGoalActors([goalActors[0], newObject])
    
  }

  const onClickDoNothing = () => {}

  const startGame = () => {
    setGame(true);
    console.log('Now the fun begins!')
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={hollywood} className="App-logo" alt="logo" />
      </header>
      <main>
        {game !== true && 
          <GameSetup
          rollActors={rollActors}
          startingThree={startingThree}
          onClickSetStartingActor={onClickSetStartingActor}
          targetThree={targetThree}
          onClickSetTargetActor={onClickSetTargetActor}
        />}
        <div>
          {(goalActors[0].name !== '' && goalActors[1].name !== '' )&& 
            (<div>
            <button onClick={startGame}>Ready?</button> 
            <button onClick={switchGoalDirection}>Change Direction</button>
            </div>)
          }

          <h2>CONNECT THESE TWO ACTORS:</h2>
          <AssetList assets={goalActors} onClick={onClickDoNothing}/>
        </div>
        <div>
          <h2>THE CHAIN</h2>
          {chain.length > 0 && 
          <AssetList 
            assets={chain}
            onClick={onClickDoNothing}/>}
        </div>
        {/* <button onClick={rollActors}>Start Game</button>
          {startingThree.length > 0 && (
            <div>
            <h3>Start With</h3> 
            <AssetList 
              assets={startingThree}
              onClick={onClickSetStartingActor}
              />
            </div>
          )}
          {targetThree.length > 0 && (
            <div>
            <h3>End With</h3> 
            <AssetList 
              assets={targetThree}
              onClick={onClickSetTargetActor}
              />
            </div>
          )} */}
        <SearchBar 
          searchActor={searchActor}
          resultFromSearch={resultFromSearch}
          setResultFromSearch={setResultFromSearch}
          defaultEmptyActorObject={defaultEmptyActorObject}
        />
        {resultFromSearch.name !== '' && 
        <AssetList 
          assets={[resultFromSearch]}
          onClick={onClickDoNothing}
        />}
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
