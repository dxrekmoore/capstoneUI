/*this file is correspsonded with the form in client/App.js
this page will set the form for the input fields
*/
import * as React from "react";
import { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { Accordion, AccordionActions,AccordionDetails,AccordionSummary } from '@mui/material';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';
import Record from '../Record/record'


function success(pos){
  var crd = pos.coords;
  console.log('Your current position is:');
  var latitude = crd.latitude;
  var longitude = crd.longitude;
  console.log(latitude);
  console.log(longitude);
}
function error(err){
  console.log(error);
}


const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ location: '', message: '', environment: '', phone_type: '', decibel: '' , selectedFile: ''});
  //if we try to update the post, make sure teh updated post information will be shown in the input filed, so we can change from the old materials
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));



  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);//when the post actions changes, we excute this function 

  const clear = () => {
    setCurrentId(0);
    setPostData({ location: '', message: '', environment: '', phone_type: '', decibel: '' , selectedFile: ''});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //if current Id is not null, then dispatch a update post 
    //otherwise if id is null, then we must be creating a post
    if (currentId === null || currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to upload your own audios.
        </Typography>
      </Paper>
    );
  }

  //these are the input fields shows in the app.js, changing of these should also make corresponded change on Posts/Post/Post.js
  return (
    <Paper className={classes.paper}>
      <Record/>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Modifying "${post.title}" Recording` : 'Upload a Recording'}</Typography>
        
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <TextField 
          //disabled
          name="location" 
          variant="outlined" 
          label="location" 
          fullWidth 
        />
        </AccordionSummary>
        <AccordionDetails>
        <TextField 
            //required
            variant="outlined"
            label="latitude"
            fullWidth
          />
          <TextField 
            //required
            variant="outlined"
            label="longtitude"
            fullWidth
          />
        </AccordionDetails>
      </Accordion>

        <TextField 
          name="message" 
          variant="outlined" 
          label="Additional Information" 
          fullWidth 
          multiline 
          rows={4} 
          value={postData.message} 
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
        />
        <TextField 
          name="environment" 
          variant="outlined" 
          label="Environment (indoor/outdoor)" 
          fullWidth 
          value={postData.environment} 
          onChange={(e) => setPostData({ ...postData, environment: e.target.value.split(',') })} 
        />
        <TextField 
          name="phone_type" 
          variant="outlined" 
          label="Phone type" 
          fullWidth value={postData.phone_type} 
          onChange={(e) => setPostData({ ...postData, phone_type: e.target.value })} 
        />
        <TextField 
          name="decibel" 
          variant="outlined" 
          label="Decibel Value" 
          fullWidth value={postData.decibel} 
          onChange={(e) => setPostData({ ...postData, decibel: e.target.value })} 
        />
        
        <div className={classes.fileInput}>
            <FileBase 
                type="file" 
                multiple={false} 
                onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} 
            />
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
      
    </Paper>
  );
};

export default Form;
