import { createContext, useState, useEffect, useCallback } from 'react';
import './App.css';
import Header from './components/Header';
import List from './components/List';
import Submit from './components/Submit';
import { boardDefault, getDayOfTheYear } from './Movies';
import axios from 'axios';


export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0 });
  const [movie, setMovie] = useState({})
  const [correctMovie, setCorrectMovie] = useState("");
  const [gameState, setGameState] = useState('playing') //won, lost, playing



  const randomMovieNumberRounded = Math.floor(getDayOfTheYear() / 20)
  const randomMovie = Math.floor((getDayOfTheYear() / 20 - randomMovieNumberRounded) * 19)


  const getData = useCallback(() => {
    axios.get('/movies')
    .then((res) => {
      console.log('movie hmm', res.data.results[randomMovie])
      // console.log('movie', res.data.results)
      setMovie(res.data.results[randomMovie])
      console.log('correct movie', res.data.results[randomMovie].original_title)
      setCorrectMovie(res.data.results[randomMovie].original_title)
    })
    .catch(error => {
      console.error('error', error);
    })
  }, [])

  useEffect(() => {getData()}, [getData])

  return (
    <div className="App">
      <Header />
      <AppContext.Provider value={{board, setBoard, currAttempt, setCurrAttempt, correctMovie, gameState, setGameState, setMovie, movie }}>
        <List />
        <Submit />
      </AppContext.Provider>
    </div>
  );
}

export default App;
