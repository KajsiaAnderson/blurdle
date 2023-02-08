import { createContext, useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import List from './components/List';
import Submit from './components/Submit';
import { boardDefault, generateMovieSet } from './Movies';


export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0 });
  const [movieSet, setMovieSet] = useState(new Set())
  const [correctMovie, setCorrectMovie] = useState("");

  useEffect(() => {
    generateMovieSet().then((movies) => {
      setMovieSet(movies.movieSet)
      console.log(movies.movieSet)
      setCorrectMovie(movies.todaysMovie);
      console.log(movies.todaysMovie)
    })
  }, [])

  return (
    <div className="App">
      <Header />
      <AppContext.Provider value={{board, setBoard, currAttempt, setCurrAttempt, movieSet, setMovieSet, correctMovie}}>
        <List />
        <Submit />
      </AppContext.Provider>
    </div>
  );
}

export default App;
