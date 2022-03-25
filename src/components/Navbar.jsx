import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import Home from '../pages/home';
import Uploading from '../uploading/client/src/App';

function NavBar(){
  return (
    <BrowserRouter>
        <nav className="navbar">
        <div className="logo">SoundScape Mapper</div>
          
          <ul className="nav-links">
            <input type="checkbox" id="checkbox_toggle" />
            <label htmlFor="checkbox_toggle" className="hamburger">&#9776;</label>
    
            <div className="menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/upload">Upload</Link></li>
      
            <li className="services">
              <a href="/">Services</a>
              <ul className="dropdown">
                <li><a href="/">Dropdown 1</a></li>
                <li><a href="/">Dropdown 2</a></li>
                <li><a href="/">Dropdown 2</a></li>
                <li><a href="/">Dropdown 3</a></li>
                <li><a href="/">Dropdown 4</a></li>
              </ul>
            </li>
            <li><Link to="/home">Contact Us</Link></li>
          </div>
        </ul>
      </nav>

      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/upload">
          <Uploading />
        </Route>
      </Switch>
    </BrowserRouter>   
  );
}

export default NavBar;
        