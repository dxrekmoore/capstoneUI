/*this file will be used to deal with the functions a user would take 

and the detailed coding will be in server/controllers/posts.js*/

/*do all the routes with function POST*/
import express from 'express';

import { getPosts,createPost,updatePost,deletePost,likePost,getPost } from '../controllers/posts.js';
import auth from "../middleware/auth.js";
// setup router 
const router = express.Router();

//the first paramter is the path, the third para is the action to be omplemented when someone is in the path 
//the second parameter decide if the user has the authorization to do the operations 
router.get('/', getPosts)// http://localhost:5000/posts
router.get('/:id', getPost);

router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);//frontend 
router.delete('/:id', auth, deletePost);//frontend 
router.patch('/:id/likePost',auth, likePost);//backend -- in controller/posts


export default router;