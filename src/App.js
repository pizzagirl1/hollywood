import hollywood from './images/hollywood.jpg'
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

import SearchBar from './components/SearchBar';
import AssetList from './components/AssetList';
import GameSetup from './components/GameSetup';

const TMDB_TOKEN = `${process.env.REACT_APP_TMDB_API_KEY}`;
const TMDB_URL = 'https://api.themoviedb.org/3';
const FIREBASE_DB_URL = 'https://hollywood-360-data-default-rtdb.firebaseio.com/actors.json';

const App = () => {
  const defaultEmptyActorObject = { name: null, id: null, imagePath: null, type: 'Actor'};
  const [resultFromSearch, setResultFromSearch] = useState(defaultEmptyActorObject);
  const [searchData, setSearchData] = useState([]);
  
  // eslint-disable-next-line
  useEffect( () => {fetchPopularActors()}, []);
  const [popularActors, setPopularActors] = useState([]);

  const NUMBER_OF_OPTIONS = 6;
  const [optionsGoalActor0, setOptionsGoalActor0] = useState([]);
  const [optionsGoalActor1, setOptionsGoalActor1] = useState([]);
  const [goalActors, setGoalActors] = useState([defaultEmptyActorObject, defaultEmptyActorObject]);

  const [chain, setChain] = useState([]);
  const chainDisplayArray = [
    goalActors[0], 
    ...chain, 
    defaultEmptyActorObject, 
    goalActors[1]
  ];

  const [game, setGame] = useState(null);

  const startGame = () => {
    if (game === false && (goalActors[0].name === null || goalActors[1].name === null)){
      window.alert("You must choose two starting actors first!")
      return 
    } else if (game === false) {
      setGame(true);
      onClickSetResultFromSearch(goalActors[0])
    } else {
      setGame(false)
      rollActors()
      setResultFromSearch(defaultEmptyActorObject)
    }
  };

  const gameButtonText = game === true ? "New Game" : "Start Game";

  const gameButtonColor = () => {
    if (game === null){return "btn-primary"}
    else if (goalActors[0].name === null || goalActors[1].name === null){return "btn-danger"}
    else if (game === false){return "btn-success"}
    else if (game === true){return "btn-warning"}
  }

  const getActorsFromDatabase = () => {
    const options = {
      method: 'GET',
      url: FIREBASE_DB_URL,
    }

    return axios
    .request(options)
    .then((response) => {return(response.data)})
    .catch((error) => console.log("Error while getting Actors from db: ", error.message))
  };

  const buildActorDataList = () => {
    let actorData = []
    getActorsFromDatabase().then((response) => {
      for (let actor in response) {
        actorData.push(response[actor])
      }
      // console.log(response)
    })
    // for (let i = 1; i <= 10; i++) {
    //   getPopularActors(i)
    //   .then( (response) => {
    //     actorData.push(...response); 
    //   })
    // }
    // const isMarginalizedGender = (actor) => {
    //   return actor.gender;
    // }
    // const bechdelData = actorData.filter(isMarginalizedGender);
    // console.log(bechdelData);
    // return bechdelData;
    // console.log(actorData);
    return actorData;
  };

  const fetchPopularActors = () => {
    setPopularActors(buildActorDataList())
  };

  const generateRandomActors = (number, people) => {
    const result = new Set();
    while (result.size < number) {
      let randomIndex = Math.floor(Math.random() * people.length);
      //this is where the Bechdel happens!
      // if (people[randomIndex].gender) {
        result.add(people[randomIndex]);
      // }
    }
    return Array.from(result);
  };

  const rollActors = () => {
    setGoalActors([defaultEmptyActorObject, defaultEmptyActorObject])
    setChain([])

    const randomActors = generateRandomActors(NUMBER_OF_OPTIONS, popularActors);
    const lengthOfArray = randomActors.length
    const midpointOfArray = Math.floor(lengthOfArray / 2)
  
    setOptionsGoalActor0(randomActors.slice(0, midpointOfArray));
    setOptionsGoalActor1(randomActors.slice(midpointOfArray, lengthOfArray));
  };

  const onClickSetGoalActor0 = (data) => {
    const newObject = {
      id: data.id,
      name: data.name,
      imagePath: data.imagePath,
      type: data.type
    }
    setGoalActors([newObject, goalActors[1]]);
    setResultFromSearch(newObject);
    fetchMovieCreditsForActor(newObject.id)
    .then( (response) => setSearchData(response));
  };

  const onClickSetGoalActor1 = (data) => {
    const newObject = {
      id: data.id,
      name: data.name,
      imagePath: data.imagePath,
      type: data.type
    }
    setGoalActors([goalActors[0], newObject]);
    setResultFromSearch(newObject);
    fetchMovieCreditsForActor(newObject.id)
    .then( (response) => setSearchData(response));
    
  };

  const switchGoalDirection = () => {
    const tempActors = optionsGoalActor1;
    setOptionsGoalActor1(optionsGoalActor0);
    setOptionsGoalActor0(tempActors)
    setGoalActors([goalActors[1], goalActors[0]])
    setChain([])
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
    .then( (response) => {
      return convertActorDataFromAPI(response.data.results[0])
    })
    .catch( (error) => {
      if (error.message.includes('undefined')) {
        window.alert('Search not valid. Try again.');
        return {
          name: null,
          id: 0
        };
      } else {
      console.log("Error Searching for Actor", query, error.message)}})
  };

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
          name: null,
          id: 0
        };
      } else {
      console.log("Error Searching for Actor", query, error.message)}})
  };

  const onClickSetResultFromSearch = (data) => {
    setResultFromSearch(data)
    if (data.type === 'Actor') {
      fetchMovieCreditsForActor(data.id)
        .then( (responseData) => setSearchData(responseData))
    } else if (data.type === 'Movie') {
      fetchCastDataForMovie(data.id)
        .then( (responseData) => setSearchData(responseData))
    }
  };

  const convertActorDataFromAPI = (person) => {
    return {
      id: person.id,
      name: person.name,
      gender: (person.gender === (1 || 3) ) ? true : false,
      imagePath: person.profile_path,
      type: 'Actor'
    };
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
    if (actorId === null) {return []}

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
  };

  const fetchCastDataForMovie = (movieId) => {
    if (movieId === 0 || movieId === null) {return []}
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
  };

  const onClickAppendAssetToChain = (newAsset) => {
    const endOfChain = chainDisplayArray.at(-3)

    if (endOfChain.type === newAsset.type) {
      onClickSetResultFromSearch(newAsset)
      return;
    }
    const newAssetIsGoalActor = 
        goalActors[1].name === newAsset.name && 
        goalActors[1].id === newAsset.id;
    try { verifyAssetBeforeAddingToChain(newAsset)
      .then( (isVerified) => {
        if (!isVerified) {
            onClickSetResultFromSearch(newAsset)
        } else if (newAssetIsGoalActor) {
            // window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
            endOfGame();
        } else if (window.confirm(`Add ${newAsset.name}?`)) {
            // window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
            const newChain = [...chain, newAsset];
            setChain(newChain);
            setResultFromSearch(newAsset);
            withNewestChainItemSetSearchData(newAsset);
        } else {
            onClickSetResultFromSearch(newAsset)
        }
        return;
      })
    } catch(e) {onClickSetResultFromSearch(newAsset)}
  };

  const verifyAssetBeforeAddingToChain = (data) => {
    const endOfChain = chainDisplayArray.at(-3)

    if (endOfChain.type === data.type) {return false}
    if (endOfChain.name === null) {return false}
    if (game === false) {return false}

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
  };

  const withNewestChainItemSetSearchData = (data) => {
    if (data.type === 'Actor') {
      fetchMovieCreditsForActor(data.id)
      .then( (response) => setSearchData(response))
    } else if (data.type === "Movie") {
      fetchCastDataForMovie(data.id)
      .then( (response) => setSearchData(response))
    }
  };

  const endOfGame = () => {
    chainDisplayArray.splice(-2, 1);
    const successfulChainArray = chainDisplayArray.map(asset => asset.name)
    const successfulChainArrayText = successfulChainArray.join('\n')
    const message = `You connected ${goalActors[0].name} to ${goalActors[1].name} in ${chainDisplayArray.length} steps!` 
    window.alert(`${message} \n\n${successfulChainArrayText}`)
    startGame()
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={hollywood} className="App-logo" alt="logo" />
      </header>
      <main>
        <div className="container">
          <div className="alert alert-success" role="alert">
            Alert
            <button className="btn-close" aria-label='close' data-bs-dismiss="alert"></button>
          </div>
          {/* <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#modal">How To Play</button>
          <div className="modal" id="modal">
            <div className="modal-dialog">
              <div className="modal-content">
                <p>Hollywood 360 is a game about making connections. The objective of the game is connect stars from Hollywood to each other by chaining 
                  together different movies and actors. Each link in the chain will alternate between actor and movie, and each successive link must 
                  include the last element.</p>
                <p>For example, starting with Lucy Liu, you could add Charlie’s Angels which also stars Drew Barrymore (among many others). If your goal 
                  is to connect Lucy Liu to Adam Sandler, you could go from Drew Barrymore to 50 First Dates, which also stars Adam Sandler. Then you 
                  would have connected Lucy Liu to Adam Sandler in 5 steps!</p>
                <p>To begin, you’ll be dealt two groups of three stars. Pick a star from the first group to be your starting point, and a star from the 
                  second group to be your end point. If you aren’t familiar with some of the stars you’ve been dealt, you can click “Mulligan” to get 
                  new options before starting the game. Once you are ready, click “Start Game!” At any point, you can switch the start and end points 
                  by clicking “Change Direction,” but you will lose any progress you have made.</p>
                <p>Thanks for playing!</p>
              </div>
            </div>
          </div> */}
        </div>
        <div>
        <button className={`btn ${gameButtonColor()}`} onClick={startGame}>{gameButtonText}</button> 
        {game !== null &&
        <button className="btn btn-primary" onClick={switchGoalDirection}>Change Direction</button>}
        {game === false && 
        <button className="btn btn-primary" onClick={rollActors}>Mulligan</button>}
        </div>
        {game === false && (
          <div>
            <GameSetup
              optionsGoalActor0={optionsGoalActor0}
              onClickSetGoalActor0={onClickSetGoalActor0}
              optionsGoalActor1={optionsGoalActor1}
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
