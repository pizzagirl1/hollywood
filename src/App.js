import hollywood from './images/hollywood.jpg'
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

import SearchBar from './components/SearchBar';
import AssetList from './components/AssetList';
import GameSetup from './components/GameSetup';

const TMDB_TOKEN = `${process.env.REACT_APP_TMDB_API_KEY}`
const TMDB_URL = 'https://api.themoviedb.org/3'

const App = () => {
  const defaultEmptyActorObject = { name: null, id: null, imagePath: null, type: 'Actor'};
  const [resultFromSearch, setResultFromSearch] = useState(defaultEmptyActorObject);
  const [searchData, setSearchData] = useState([])
  
  // eslint-disable-next-line
  useEffect( () => {fetchPopularActors()}, [])
  const [popularActors, setPopularActors] = useState([])
  const [startingThree, setStartingThree] = useState([])
  const [targetThree, setTargetThree] = useState([])
  const [goalActors, setGoalActors] = useState([defaultEmptyActorObject, defaultEmptyActorObject])

  const [chain, setChain] = useState([])
  const chainDisplayArray = [
    goalActors[0], 
    ...chain, 
    defaultEmptyActorObject, 
    goalActors[1]
  ]

  const [game, setGame] = useState(null)


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
      setResultFromSearch(defaultEmptyActorObject)
    }
  }

  const gameButtonText = game === true ? "New Game" : "Start Game";

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
    for (let i = 1; i <= 10; i++) {
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
  };
  
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
    return axios
      .request(options)
      .then((response) => {
        return response.data.cast.map(convertActorDataFromAPI)})
      .catch((error) => {
        console.log("Error during fetchCastDataForMovie", error.message);});
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

  const onClickAppendAssetToChain = (newAsset) => {

    const newAssetIsGoalActor = 
        goalActors[1].name === newAsset.name && 
        goalActors[1].id === newAsset.id;

    verifyAssetBeforeAddingToChain(newAsset)
    .then((isVerified)=> {
      if (!isVerified) {
          window.alert("That selection does not continue the chain. Try again.")
          return 
      } else if (isVerified && newAssetIsGoalActor) {
          endOfGame();
          return;
      } else if (isVerified) {
          const newChain = [...chain, newAsset];
          setChain(newChain);
          setResultFromSearch(newAsset);
          withNewestChainItemSetSearchData(newAsset);
          return;
      }
    })
  }

  const verifyAssetBeforeAddingToChain = (data) => {
    const endOfChain = chainDisplayArray.at(-3)

    if (endOfChain.type === data.type) {return false}

    if (endOfChain.type === 'Actor') {
      return fetchMovieCreditsForActor(endOfChain.id).then((response) => {
        const namesOfMovies = response.map((movie) => movie.name)
        return namesOfMovies.includes(data.name)
      })
    } else if (endOfChain.type === 'Movie') {
      return fetchCastDataForMovie(endOfChain.id).then((response) => {
        const namesOfActors = response.map((actor) => actor.name)
        return namesOfActors.includes(data.name)
      })
    }
  }

  const withNewestChainItemSetSearchData = (data) => {
    if (data.type === 'Actor') {
      fetchMovieCreditsForActor(data.id)
      .then( (response) => setSearchData(response))
    } else if (data.type === "Movie") {
      fetchCastDataForMovie(data.id)
      .then( (response) => setSearchData(response))
    }
  }

  const endOfGame = () => {
    chainDisplayArray.splice(-2, 1);
    const successfulChainArray = chainDisplayArray.map(asset => asset.name)
    const successfulChainArrayText = successfulChainArray.join('\n')
    const message = `You connected ${goalActors[0].name} to ${goalActors[1].name}!` 
    window.alert(`${message} \n\n${successfulChainArrayText}`)
    startGame()
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

  const onClickSetGoalActor0 = (data) => {
    const newObject = {
      id: data.id,
      name: data.name,
      imagePath: data.imagePath,
      type: data.type
    }
    setGoalActors([newObject, goalActors[1]])
  }

  const onClickSetGoalActor1 = (data) => {
    const newObject = {
      id: data.id,
      name: data.name,
      imagePath: data.imagePath,
      type: data.type
    }
    setGoalActors([goalActors[0], newObject])
    
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={hollywood} className="App-logo" alt="logo" />
      </header>
      <main>
        <div>
        <button onClick={startGame}>{gameButtonText}</button> 
        <button onClick={switchGoalDirection}>Change Direction</button>
        {game === false && <button onClick={rollActors}>Mulligan</button>}
        </div>
        {game === false && (
          <div>
            <GameSetup
              startingThree={startingThree}
              onClickSetGoalActor0={onClickSetGoalActor0}
              targetThree={targetThree}
              onClickSetGoalActor1={onClickSetGoalActor1}
              goalActors={goalActors}
            />
          </div>
        )}
        {game === true && (
          <div>
            <h2>CONNECT THESE ACTORS:</h2>
            <div> 
              <AssetList 
                assets={chainDisplayArray}
                onClick={onClickSetResultFromSearch}
                goalActors={goalActors}
                />
            </div>
          </div>
        )}
        <SearchBar 
          searchActor={searchActor}
          searchMovie={searchMovie}
          resultFromSearch={resultFromSearch}
          setResultFromSearch={setResultFromSearch}
          defaultEmptyActorObject={defaultEmptyActorObject}
          fetchMovieCreditsForActor={fetchMovieCreditsForActor}
          fetchCastDataForMovie={fetchCastDataForMovie}
          onClickAssetList={onClickAppendAssetToChain}
          searchData={searchData}
          setSearchData={setSearchData}
        />
        <div>
        This product uses the TMDB API but is not endorsed or certified by TMDB.
        </div>
      </main>
    </div>
  );
}

export default App;
