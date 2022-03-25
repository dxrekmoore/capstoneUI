/*this file contains all the handlers for the routes, it helps us to 
see the functions in server/routes/posts.js */
import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

const router = express.Router();


export const getPosts = async (req, res) => {
    try {
        //await can make this function asychronize, otherwise it will be sychronize
        const postMessages = await PostMessage.find();
        // http statue tutorial: https://www.restapitutorial.com/httpstatuscodes.html
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//implmenet logic for adding different posts 
export const createPost = async (req, res) => {
    //const { audio_origin, location, message, environment, phone_type, decibel , selectedFile} = req.body;

    //const newPostMessage = new PostMessage({ audio_origin, location, message, environment, phone_type, decibel , selectedFile})

    const post = req.body;
    const newPostMessage = new PostMessage({ ...post, audio_origin: req.userId, createdAt: new Date().toISOString()})
    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;//the id will be filled once the request is sent 
    const { audio_origin, location, message, environment, phone_type, decibel , selectedFile} = req.body;

    //check if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    //if the id is valid, we can update the post
    const updatedPost = { audio_origin, location, message, environment, phone_type, decibel , selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
    res.json(updatedPost);   

}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}


export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    //check if teh users' like is already inside the like list 
    const index = post.likes.findIndex((id) => id ===String(req.userId));
    
    if (index === -1) {//like the post 
        post.likes.push(req.userId);
      } else {//dislike the post 
        post.likes = post.likes.filter((id) => id !== String(req.userId));
      }

      const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    
    res.status(200).json(updatedPost);
}
/*





export default router;*/