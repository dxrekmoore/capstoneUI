/*this file will be used to deal with the functions a user would take 

and the detailed coding will be in server/controllers/posts.js*/

/*do all the routes with function POST*/
import express from 'express';

/*import { getPosts, getPost, createPost, updatePost, likePost, deletePost } from '../controllers/posts.js';
*/ 
import { getPosts,createPost,updatePost,deletePost,likePost,getPost } from '../controllers/posts.js';

// setup router 
const router = express.Router();

//the first paramter is the path, the second para is the action to be omplemented when someone is in the path 
router.get('/', getPosts)// http://localhost:5000/posts
router.post('/', createPost);
router.get('/:id', getPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);

/*
router.get('/', getPosts); //PATH: localhost:5000/
router.post('/', createPost);
router.get('/:id', getPost);
router.patch('/:id', updatePost);
*/

export default router;