import hollywood from './images/hollywood.jpg'
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
// import drew from './drew.json'
// import setTimeout from 'timers/promises'

import SearchBar from './components/SearchBar';
import AssetList from './components/AssetList';
import GameSetup from './components/GameSetup';

const TMDB_TOKEN = `${process.env.REACT_APP_TMDB_API_KEY}`
const TMDB_URL = 'https://api.themoviedb.org/3'

function App() {
  const defaultEmptyActorObject = { name: '', id: 0, imagePath: null, type: 'Actor'};
  const [resultFromSearch, setResultFromSearch] = useState(defaultEmptyActorObject);
  const [searchData, setSearchData] = useState([])

  const [popularActors, setPopularActors] = useState([])
  const [chain, setChain] = useState([])

  const [startingThree, setStartingThree] = useState([])
  const [targetThree, setTargetThree] = useState([])
  const [goalActors, setGoalActors] = useState([defaultEmptyActorObject, defaultEmptyActorObject])

  const [game, setGame] = useState([false])
  // const [drewData, setDrewData] = useState(drew.movies)

  useEffect( () => {
    // fetchThenRoll()
    fetchPopularActors()
    // rollActors()
    // .then(() => rollActors())
    // eslint-disable-next-line
  }, [])

  // useEffect( () => {
  //   console.log("change in popular actors");
  //   console.log(popularActors);
  // }, [popularActors])

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

  const searchMovie = (query) => {
    const options = {
      method: 'GET',
      url: `${TMDB_URL}/search/movie`,
      params: {query: query},
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + TMDB_TOKEN
      }
    };

    return axios
    .request(options)
    .then( (response) => {
      return convertMovieDataFromAPI(response.data.results[0])
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
    // .then(rollActors())
    // return null
    // setPopularActors(buildActorDataList().filter(isMarginalizedGender))
  };

  // const fetchThenRoll = () => {
  //   fetchPopularActors().then(() => rollActors())
  // }
  
  const convertMovieDataFromAPI = (movie) => {
    return {
      id: movie.id,
      name: movie.title,
      imagePath: movie.poster_path,
      popularity: movie.popularity,
      type: 'Movie'
    };
  };
  
  const fetchMovieCreditsForActor = (actorId) => {
    if (actorId === 0) {return []}

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
        const result = response.data.cast.map(convertMovieDataFromAPI)
        return result.sort( (a,b) => a.popularity < b.popularity)
      })
      .catch((error) => {
        console.log("Error during fetchMovieCreditsForActor", error.message);});
  }

  const fetchCastDataForMovie = (movieId) => {
    if (movieId === 0) {return []}
    const options = {
      method: 'GET',
      url: `${TMDB_URL}/movie/${movieId}/credits`,
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + TMDB_TOKEN
      }
    };
    console.log('fetching movie credits for ', movieId);
    return axios
      .request(options)
      .then((response) => {
        const result = response.data.cast
        .map(convertActorDataFromAPI)
        // const result = response.data.results.cast.map(convertMovieDataFromAPI);
        console.log(result)
        return result
      })
      .catch((error) => {
        console.log("Error during fetchCastDataForMovie", error.message);});
  }

  // const goalActorCredits = fetchMovieCreditsForActor(goalActors[0].id)
  
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

  const chainDisplayArray = [
    goalActors[0], 
    ...chain, 
    defaultEmptyActorObject, 
    goalActors[1]
  ]

  const onClickAppendObjectToChain = (data) => {
    // this should check if the object is the same as goalActor1
    const newObject = {
      id: data.id,
      name: data.name,
      imagePath: data.imagePath,
      type: data.type
    }
    
    const newChain = [...chain, newObject]
    console.log("New Chain", newChain)
    setChain(newChain)
  }

  const onClickSetResultFromSearch = (data) => {
    setResultFromSearch(data)
    if (data.type === 'Actor') {
      fetchMovieCreditsForActor(data.id)
        .then( (responseData) => setSearchData(responseData))
    } else if (data.type === 'Movie') {
      fetchCastDataForMovie(data.id)
        .then( (responseData) => setSearchData(responseData))
    }
  }

  // change to ActorA or TargetA... goalActor0
  const onClickSetStartingActor = (data) => {
    const newObject = {
      id: data.id,
      name: data.name,
      imagePath: data.imagePath,
      type: data.type
    }
    setGoalActors([newObject, goalActors[1]])
  }

  // change to ActorB or TargetB... goalActor1
  const onClickSetTargetActor = (data) => {
    const newObject = {
      id: data.id,
      name: data.name,
      imagePath: data.imagePath,
      type: data.type
    }
    setGoalActors([goalActors[0], newObject])
    
  }
  
  // const onClickDoNothing = () => {
  //   return null
  // }

  const startGame = () => {
    if (game === false && (goalActors[0].name === '' || goalActors[1].name === '')){
      window.alert("You must choose two starting actors first!")
      return 
    } else if (game === false) {
      setGame(true);
      setResultFromSearch(defaultEmptyActorObject)
    } else {
      setGame(false)
      rollActors()
    }
  }

  const gameButtonText = game === true ? "New Game" : "Start Game";

  return (
    <div className="App">
      <header className="App-header">
        <img src={hollywood} className="App-logo" alt="logo" />
      </header>
      <main>
        <div>
        <button onClick={startGame}>{gameButtonText}</button> 
        <button onClick={switchGoalDirection}>Change Direction</button>
        </div>
        {game === false && 
          <GameSetup
          rollActors={rollActors}
          startingThree={startingThree}
          onClickSetStartingActor={onClickSetStartingActor}
          targetThree={targetThree}
          onClickSetTargetActor={onClickSetTargetActor}
          goalActors={goalActors}
        />}
        {game === true && (
          <div>
            <h2>CONNECT THESE TWO ACTORS:</h2>
            <div> 
              <AssetList 
                assets={chainDisplayArray}
                onClick={onClickSetResultFromSearch}
                goalActors={goalActors}
                />
            </div>
          </div>
        )}
        {/* <AssetList
          assets={goalActorCredits}
          assets={fetchMovieCreditsForActor(goalActors[0].id)}
          onClick={onClickDoNothing}
        /> */}
        <SearchBar 
          searchActor={searchActor}
          searchMovie={searchMovie}
          resultFromSearch={resultFromSearch}
          setResultFromSearch={setResultFromSearch}
          defaultEmptyActorObject={defaultEmptyActorObject}
          fetchMovieCreditsForActor={fetchMovieCreditsForActor}
          fetchCastDataForMovie={fetchCastDataForMovie}
          onClickAssetList={onClickAppendObjectToChain}
          searchData={searchData}
          setSearchData={setSearchData}
        />
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
