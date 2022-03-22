import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import Home from '../pages/home';
import Uploading from '../uploading/client/src/App';

function NavBar(){
  return (
    <BrowserRouter>
        <nav className="navbar">
        <div class="logo">SoundScape Mapper</div>
          
          <ul class="nav-links">
            <input type="checkbox" id="checkbox_toggle" />
            <label for="checkbox_toggle" class="hamburger">&#9776;</label>
    
            <div class="menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/upload">Upload</Link></li>
      
            <li class="services">
              <a href="/">Services</a>
              <ul class="dropdown">
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
        