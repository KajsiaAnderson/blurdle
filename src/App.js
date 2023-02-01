import { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header';
import List from './components/List';
import Submit from './components/Submit';
import { boardDefault } from './Movies';


export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0 });

  return (
    <div className="App">
      <Header />
      <AppContext.Provider value={{board, setBoard, currAttempt, setCurrAttempt}}>
        <List />
        <Submit />
      </AppContext.Provider>
    </div>
  );
}

export default App;
