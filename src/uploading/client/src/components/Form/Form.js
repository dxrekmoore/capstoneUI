/*this file is correspsonded with the form in client/App.js
this page will set the form for the input fields
*/
import * as React from "react";
import { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { Accordion, AccordionActions, AccordionDetails,AccordionSummary } from '@mui/material';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Geocodio from 'geocodio-library-node';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';
import Record, {mp3file, lat, long} from '../Record/record'

var audioFile = mp3file;
var base64Audio = '';
var expLat;
var expLng;


const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ location: '', latitude: '', longitude: '', message: '', environment: '', phone_type: '', decibel: '' , selectedFile: ''});
  //if we try to update the post, make sure teh updated post information will be shown in the input filed, so we can change from the old materials
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  const [isLocation, setIsLocation] = useState(true);

  
  const geocoder = new Geocodio('2e2d299326224a225d9e64239d982e522394569');
  //geocoding the location from the address to latitude and longitude 

  const geocodLatLng = (address) => {
    geocoder.geocode(address)
    .then(response => {
      setPostData({ ...postData, latitude: response.results[0].location.lat ,longitude: response.results[0].location.lng });
    })
    .catch(err => {
        console.error(err);
      }
    );
  };

  //converse addre -> lat and lng 
  const handleTranLatLon = () => {
    var addr = postData.location;
    var address = addr + ',Kingston, ON, CANADA'
    setIsLocation(false);
    geocodLatLng(address);
  }

  const geoReverse = (latitude, longitude) => {
    const coor = latitude + ',' + longitude;
    geocoder.reverse(coor, [], 1)
    .then(response => {
      setPostData({ ...postData, location: response.results[0].formatted_address });
    })
    .catch(err => {
      console.error(err);
    }
  );
  }

  const handleTranAddress = () => {
    var lat = postData.latitude;
    var lng = postData.longitude;
    geoReverse(lat,lng);
    handleTranLatLon();
  }

  //convert audio to base64
  const getBase64 = (file) => {
    return new Promise(resolve => {
      let fileInfo;
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);

      setPostData({ ...postData, selectedFile: baseURL }) 
      };  
    });
  };

  //save recording 
  const saveFile = () => {
    expLat = lat;
    expLng = long;
    console.log(expLat);
    setPostData({ ...postData, latitude: expLat, longitude: expLng })
    console.log("posted");
    audioFile = mp3file;
    getBase64(audioFile);

  };



  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);//when the post actions changes, we excute this function 

  const clear = () => {
    setCurrentId(0);
    setPostData({ location: '', latitude: '', longitude: '', message: '', environment: '', phone_type: '', decibel: '' , selectedFile: ''});
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
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Modifying "${post.title}" Recording` : 'Upload a Recording'}</Typography>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        > 

        <TextField 
          name="location" variant="outlined" label="Location" fullWidth 
          value={postData.location} 
          onChange={(e) => setPostData({ ...postData, location: e.target.value })}
        /> 
        </AccordionSummary>
        <AccordionDetails>
        <TextField 
            variant="outlined" 
            label="latitude" fullWidth
            value={postData.latitude} 
            onChange={(e) => setPostData({ ...postData, latitude: e.target.value })}
          />

          <TextField 
            //required
            variant="outlined" 
            label="longtitude" fullWidth
            value={postData.longitude} 
            onChange={(e) => setPostData({ ...postData, longitude: e.target.value })}
          />
        </AccordionDetails>
      </Accordion>


        <Button variant="contained" color="secondary" size="small" onClick={handleTranAddress} fullWidth>Save Location</Button>
        
        <TextField 
          name="message" variant="outlined" label="Additional Information" fullWidth multiline rows={4} value={postData.message} 
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
        />
        <TextField 
          name="environment" variant="outlined"  label="Environment (indoor/outdoor)" fullWidth value={postData.environment} 
          onChange={(e) => setPostData({ ...postData, environment: e.target.value.split(',') })} 
        />
        <TextField 
          name="phone_type" variant="outlined" label="Phone type" fullWidth value={postData.phone_type} 
          onChange={(e) => setPostData({ ...postData, phone_type: e.target.value })} 
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

      <div className={classes.recording}>
      <Record/>

      <Button variant="contained" color="secondary" size="small" onClick={saveFile} fullWidth>Save Audio</Button>
      </div>
      
    </Paper>
    
  );
  
};

export default Form;
