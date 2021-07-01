import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import Search from './pages/search';
import Score from './pages/score';
import NavBar from './components/nav';
import { PlayerProvider } from './context/playerContext';
import './App.css';


function App() {
  

  return (
    <div className="App">
      <PlayerProvider>
      <NavBar/>
      <Switch>
        <Route path='/' component={Home} exact>
          </Route>
          <Route path='/search' component={Search}>
          </Route>
          <Route path='/score' component={Score}>
        </Route>
      </Switch>
      </PlayerProvider>
    </div>
  );
}

export default App;