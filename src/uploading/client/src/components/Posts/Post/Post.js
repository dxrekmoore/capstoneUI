/* this page will be used to reflect the posts made by users 
the posts will be refelcted to the frontend with user input information

this file will be used by client/src/components/Posts/Posts.js
*/
import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  
  //the card are each of the displayed form 
  //changing on the forms should change this filed  
  return (
    
    <Card className={classes.card}>
    
      <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
      
      <div className={classes.overlay}>
        
        <Typography 
          variant="h6"> {post.name}
        </Typography>
        
        <Typography 
          variant="body2"> {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      
      {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
      <div className={classes.overlay2}>
        <Button onClick={() => setCurrentId(post._id)} style={{ color: 'white' }} size="small">
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      )}
      
      <div className={classes.details}>
        <Typography 
          variant="body2" 
          color="textSecondary" 
          component="h2">
          {post.environment.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      
      <Typography 
        className={classes.location} gutterBottom variant="h9" component="h4"> Location: { post.location }
      </Typography>
      
      <CardContent>
        <Typography 
          variant="body2" color="textSecondary" component="p"> Message:{post.message}
        </Typography>
      </CardContent>

      <Typography 
        className={classes.phone_type} gutterBottom variant="body2" component="p"> Phone Type: {post.phone_type}
      </Typography>

      <Typography 
        className={classes.decibel} gutterBottom variant="body2" component="p"> Decibel:{post.decibel}
      </Typography>
      
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
          
        </Button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize="small" /> Delete
        </Button>
        )}
      </CardActions>
    </Card>
    
  );
};


export default Post;
