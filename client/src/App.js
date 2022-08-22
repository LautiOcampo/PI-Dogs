import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Landing from './components/Landing/Landing.jsx'
import Home from './components/Home/Home'
import CreateDog from './components/CreateDog/CreateDog'
import Detail from './components/Detail/Detail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= '/' component= {Landing}/>
        <Route exact path= '/home' component= {Home}/>
        <Route exact path= '/dogs' component = {CreateDog}/>
        <Route path = "/dog/:id" component = {Detail}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
