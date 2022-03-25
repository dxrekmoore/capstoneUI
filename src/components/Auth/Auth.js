import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { signin, signup } from '../../uploading/client/src/actions/auth';

import useStyles from './styles';
import Input from './Input';
import Icon from './icon';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleShowPassword = () => setShowPassword(!showPassword);
    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (isSignup) {
            dispatch(signup(form, history));
          } else {
            dispatch(signin(form, history));
          }
      };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const switchMode = () => {
        //switch state 
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token } });
            history.push('/');
          } catch (error) {
            console.log(error);
          }
    };

    const googleError = (error) => {
        console.log(error);
        console.log('Google Sign In was unsuccessful. Try again later');
    };
    

  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">{ isSignup ? 'Sign Up' : 'Sign In' }</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                { //function for sigup or sigin, depends on the user state 
                    isSignup && (
                    <>
                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                    </>
                )}
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                    { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                </Grid>
                

                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                { isSignup ? 'Sign Up' : 'Sign In' }
                </Button>

                <GoogleLogin
                    clientId="75838698584-uuqrpbp070f2oq7q1vbkc50kn9brkcq7.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <Button className={classes.googleButton} 
                            color="primary" 
                            fullWidth 
                            onClick={renderProps.onClick} 
                            disabled={renderProps.disabled} 
                            startIcon={<Icon />} 
                            variant="contained">
                            Google Sign In
                        </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy="single_host_origin"
                        
                />

                <Grid container justify="flex-end">
                    <Grid item>
                    <Button onClick={switchMode}>
                        { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                    </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth