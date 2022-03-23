/* this page will be used to reflect the posts made by users 
the posts will be refelcted to the frontend with user input information

this file will be used by client/src/components/Posts/Posts.js
*/
import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId}) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  //the card are each of the displayed form 
  //changing on the forms should change this filed  
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
      
      <div className={classes.overlay}>
        <Typography 
          variant="h6">
          {post.audio_origin}
        </Typography>
        <Typography 
          variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      
      <div className={classes.overlay2}>
        <Button 
          style={{ color: 'white' }} 
          size="small" onClick={() => {setCurrentId(post._id)}}>
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      
      <div className={classes.details}>
        <Typography 
          variant="body2" 
          color="textSecondary" 
          component="h2">
          {post.environment.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      
      <Typography 
        className={classes.location} 
        gutterBottom variant="h9" 
        component="h4">
        location:
        { post.location }
      </Typography>
      <CardContent>
        <Typography 
          variant="body2" 
          color="textSecondary" 
          component="p">
          message:
          {post.message}
        </Typography>
      </CardContent>
      <Typography 
        className={classes.phone_type} 
        gutterBottom variant="body2" 
        component="p">
        phone type:
        {post.phone_type}
      </Typography>
      <Typography 
        className={classes.decibel} 
        gutterBottom variant="body2" 
        component="p">
        decibel:
        {post.decibel}
      </Typography>
      
      <CardActions className={classes.cardActions}>
        <Button 
          size="small" 
          color="primary" 
          onClick={() => dispatch(likePost(post._id))}>
          <ThumbUpAltIcon fontSize="small" /> 
          Like {post.likeCount} 
        </Button>

        <Button 
          size="small" 
          color="primary" 
          onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize="small" /> 
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
