/*this will be the base app interface,
to run this, type command npm start in the client folder terminal*/
import { Container, AppBar, Grow, Grid } from '@material-ui/core';

//use hook, which makes redux easier, this allows us to dispatch an action 
import { useDispatch } from 'react-redux';
// dispatch the action
import React, { useState, useEffect } from 'react';
//actions which will be used in dispatch field 
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { getPosts } from './actions/posts';

//this is the logo picture filed 
import useStyles  from './styles'

const App = () => {
    const classes = useStyles();
    const dispatch = useDispatch();// a hook 
    const [currentId, setCurrentId] = useState(null);
    
    useEffect(() => {
        dispatch(getPosts());
      }, [currentId, dispatch]);//make sure the change can be applied immediately

    return(
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position='static' color='inherit'>

            </AppBar>
            <Grow in>
        <Container>
          <Grid className={classes.mainContainer}container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;


