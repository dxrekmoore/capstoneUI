import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation  } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import useStyles from './styles';

const NavBar = () =>{
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    history.push('/');
    setUser(null);
  };

  console.log(user);

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <div>
      <nav className="navbar">
        <div className="logo">SoundScape Mapper</div>
        <ul className="nav-links">
          <input type="checkbox" id="checkbox_toggle" />
          <label htmlFgior="checkbox_toggle" className="hamburger">&#9776;</label>
          <div className="menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/upload">Upload</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <div >
              {user?.result ? (
                <div className={classes.profile}>
                  
                  <Typography className={classes.userName} variant="h9">{user?.result.name}</Typography>
                  <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                </div>
              ) : (
                <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
              )}
      </div>
          </div>
          
        </ul>
        
        
          
      </nav>

    </div>   
  );
};

export default NavBar;
        