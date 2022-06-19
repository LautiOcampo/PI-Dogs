import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Landing from './components/Landing/Landing.jsx'
import Home from './components/Home'
import createDog from './components/CreateDog'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= '/' component= {Landing}/>
        <Route path= '/home' component= {Home}/>
        <Route path= '/create/dog' component = {createDog}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
