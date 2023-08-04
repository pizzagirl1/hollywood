import hollywood from './images/hollywood.jpg'
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import drew from './drew.json'
// import setTimeout from 'timers/promises'

import SearchBar from './components/SearchBar';
import AssetList from './components/AssetList';
import GameSetup from './components/GameSetup';

const TMDB_TOKEN = `${process.env.REACT_APP_TMDB_API_KEY}`
const TMDB_URL = 'https://api.themoviedb.org/3'

function App() {
  const defaultEmptyActorObject = { name: '', id: 0, imagePath:'', type: 'Actor'};
  const [resultFromSearch, setResultFromSearch] = useState(defaultEmptyActorObject);

  const [popularActors, setPopularActors] = useState([])
  const [chain, setChain] = useState([])

  const [startingThree, setStartingThree] = useState([])
  const [targetThree, setTargetThree] = useState([])
  const [goalActors, setGoalActors] = useState([defaultEmptyActorObject, defaultEmptyActorObject])

  const [game, setGame] = useState([false])
  const [drewData, setDrewData] = useState(drew.movies)

  useEffect( () => {
    fetchPopularActors();
    // console.log(drewData)
    // setDrewData(fetchMovieCreditsForActor(69597));
    // eslint-disable-next-line
  }, [])
  // useEffect( () => {
  //   console.log("hello mark!");
  //   console.log(popularActors);
  // }, [popularActors.length])

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
      return convertActorDataFromAPI(response.data.results[0])
    })
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

  // const searchMovie = (query) => {
  //   const options = {
  //     method: 'GET',
  //     url: `${TMDB_URL}/search/movie`,
  //     params: {query: query},
  //     headers: {
  //       accept: 'application/json',
  //       Authorization: 'Bearer ' + TMDB_TOKEN
  //     }
  //   };

  //   return axios
  //   .request(options)
  //   .then( (response) => {
  //     return {
  //       id: response.data.results[0].id,
  //       name: response.data.results[0].name,
  //       imagePath: response.data.results[0].profile_path,
  //       type: 'Actor'
  //   }})
  //   .catch( (error) => {
  //     if (error.message.includes('undefined')) {
  //       window.alert('Search not valid. Try again.');
  //       return {
  //         name: '',
  //         id: 0
  //       };
  //     } else {
  //     console.log("Error Searching for Actor", query, error.message)}})
  // }

  const convertActorDataFromAPI = (person) => {
    return {
      id: person.id,
      name: person.name,
      gender: (person.gender === (1 || 3) ) ? true : false,
      imagePath: person.profile_path,
      type: 'Actor'
    };
  };

  const getPopularActors = (page) => {
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
        return response.data.results.map(convertActorDataFromAPI);})
      .catch((error) => {
        console.log("Error during getPopularActors", error.message);});
  }

  const buildActorDataList = () => {
    let actorData = []
    for (let i = 1; i <= 2; i++) {
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

  const fetchPopularActors = () => {

    setPopularActors(buildActorDataList())
    // setPopularActors(buildActorDataList().filter(isMarginalizedGender))
  };
  
  const convertMovieDataFromAPI = (movie) => {
    console.log("hi adrian")
    return {
      id: movie.id,
      title: movie.title,
      imagePath: movie.poster_path,
      type: 'Movie'
    };
  };
  
  const fetchMovieCreditsForActor = (actorId) => {

    const options = {
      method: 'GET',
      url: `${TMDB_URL}/person/${actorId}/movie_credits`,
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + TMDB_TOKEN
      }
    };
    console.log('fetching movie credits for ', actorId);
    return axios
      .request(options)
      .then((response) => {
        const result = response.data.cast
        .map(convertMovieDataFromAPI)
        // const result = response.data.results.cast.map(convertMovieDataFromAPI);
        console.log(result)
        return result
      })
      .catch((error) => {
        console.log("Error during fetchMovieCreditsForActor", error.message);});
  }
  
  const generateSixRandomActors = (people) => {
    const result = new Set();
    while (result.size < 6) {
      let randomIndex = Math.floor(Math.random() * people.length);
      result.add(people[randomIndex]);
    }
    return Array.from(result);
  }

  const rollActors = () => {
    setGoalActors([defaultEmptyActorObject, defaultEmptyActorObject])
    setChain([])
    const sixRandomActors = generateSixRandomActors(popularActors);
    setStartingThree(sixRandomActors.slice(0, 3));
    setTargetThree(sixRandomActors.slice(3, 6));
  }

  const switchGoalDirection = () => {
    const tempActors = targetThree;
    setTargetThree(startingThree);
    setStartingThree(tempActors)
    setGoalActors([goalActors[1], goalActors[0]])
    setChain([])
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
          goalActors={goalActors}
        />}

        <div>
          {(goalActors[0].name !== '' && goalActors[1].name !== '' )&& 
            (<div>
            <button onClick={startGame}>Ready?</button> 
            <button onClick={switchGoalDirection}>Change Direction</button>
            </div>)}
          <h2>CHOOSE TWO ACTORS TO CONNECT:</h2>
          {(goalActors[0].name !== '' || goalActors[1].name !== '') &&
          <AssetList assets={goalActors} onClick={onClickDoNothing}/>
          }
        </div>

        {chain.length > 0 && (
        <div> 
          <h2>THE CHAIN</h2>
          <AssetList 
            assets={chain}
            onClick={onClickDoNothing}/>
        </div>)}

        <SearchBar 
          searchActor={searchActor}
          resultFromSearch={resultFromSearch}
          setResultFromSearch={setResultFromSearch}
          defaultEmptyActorObject={defaultEmptyActorObject}
        />

        {resultFromSearch.name !== '' && 
        (<div>
          <AssetList 
          assets={[resultFromSearch]}
          onClick={onClickDoNothing}
          />
          <AssetList
            // assets={fetchMovieCreditsForActor(resultFromSearch.id)}
            assets={drewData}
            onClick={onClickDoNothing}
          />
        </div>)}

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
