import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Landing from './components/Landing/Landing.jsx'
import Home from './components/Home'
import CreateDog from './components/CreateDog'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= '/' component= {Landing}/>
        <Route path= '/home' component= {Home}/>
        <Route path= '/dogs' component = {CreateDog}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
