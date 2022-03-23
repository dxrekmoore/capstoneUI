/*this file is correspsonded with the form in client/App.js
this page will set the form for the input fields
*/
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ audio_origin: '', location: '', message: '', environment: '', phone_type: '', decibel: '' , selectedFile: ''});
  //if we try to update the post, make sure teh updated post information will be shown in the input filed, so we can change from the old materials
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();


  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);//when the post actions changes, we excute this function 

  const clear = () => {
    setCurrentId(0);
    setPostData({ audio_origin: '', location: '', message: '', environment: '', phone_type: '', decibel: '' , selectedFile: ''});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //if current Id is not null, then dispatch a update post 
    //otherwise if id is null, then we must be creating a post
    if (currentId === 0) {
      dispatch(createPost(postData));
      clear();
    } else {
      dispatch(updatePost(currentId, postData));
      clear();
    }
  };

  //these are the input fields shows in the app.js, changing of these should also make corresponded change on Posts/Post/Post.js
  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Modifying "${post.title}" Recording` : 'Upload a Recording'}</Typography>
        <TextField 
          name="audio_origin" 
          variant="outlined" 
          label="Audio Origin" 
          fullWidth 
          value={postData.audio_origin} 
          onChange={(e) => setPostData({ ...postData, audio_origin: e.target.value })} 
        />
        <TextField 
          name="location" 
          variant="outlined" 
          label="location" 
          fullWidth 
          value={postData.location} 
          onChange={(e) => setPostData({ ...postData, location: e.target.value })} 
        />
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
          fullWidth value={postData.environment} 
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
