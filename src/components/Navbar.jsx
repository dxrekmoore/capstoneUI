import React from 'react'
//navs the name of each different list item
//gonna be a home page and a help page

//Need to add props for the nav tittles
function Navbar({navs}) {
  return (
    <nav className="navbar">
 
        <div class="logo">SoundScape Mapper</div>
        <ul class="nav-links">
        <input type="checkbox" id="checkbox_toggle" />
        <label for="checkbox_toggle" class="hamburger">&#9776;</label>
        
        <div class="menu">
        <li><a href="/">Home</a></li>
        <li><a href="/">About</a></li>
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
        <li><a href="/">Contact</a></li>
        </div>
        </ul>
        </nav>
        )
}

export default Navbar