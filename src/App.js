import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Contact from './pages/home';
import Uploading from './uploading/client/src/App';
import Auth from './components/Auth/Auth';
import NavBar from './components/Navbar';
import Home from './components/Home/Basemap';
function App() { 
  return (
    <>
      <BrowserRouter>   
        <div className="App">
        <NavBar/>
        
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/contact"><Contact /></Route>
          <Route path="/upload"><Uploading /></Route>
          <Route path="/auth"><Auth /></Route>
        </Switch>
        </div>

      </BrowserRouter>   
    </>
  );
}

export default App;