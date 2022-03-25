import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/home';
import Uploading from './uploading/client/src/App';
import Auth from './components/Auth/Auth';
import NavBar from './components/Navbar';
import Basemap from './components/Basemap';
function App() { 
  return (
    <>
      <BrowserRouter>   
        <div className="App">
        <NavBar/>
        <Basemap/>
        <Switch>
          <Route path="/home"><Home /></Route>
          <Route path="/upload"><Uploading /></Route>
          <Route path="/auth"><Auth /></Route>
        </Switch>
        </div>
      </BrowserRouter>   
    </>
  );
}

export default App;