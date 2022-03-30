//apid functions are related to the actions/posts.js

//make api calls 
import axios from 'axios';

//specify your url -- pointing to the backend 
const url = 'http://cygnus.ece.queensu.ca/api/posts';

//error function 
export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
