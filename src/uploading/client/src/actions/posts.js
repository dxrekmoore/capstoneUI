/* this file will implement the user actions in the client/src/api/index.js 
includes, fetchPosts, createPosts, etc
The actions will be used in App.js, and when the user implmenet such in the frontend, 
functions in this file will react with the backend

action will need to use api
*/

//import everything as a fucntion as an api
import * as api from '../api/index.js';

//Action Creatros: functions that retrun an action, an action will have a type and a payload 
//we deal with the async data
export const getPosts = () => async (dispatch) => {
    try {
        //get response from api, which will always have data object from the backend, and then we can get the data
        const { data } = await api.fetchPosts();
        //payload will store the data
        dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {
        console.log(error);
    }
  };


export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: 'CREATE', payload: data });
  } catch (error) {
    console.log(error);
  }
};
  
export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: 'UPDATE', payload: data });
  } catch (error) {
    console.log(error);
  }
};
  
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: 'DELETE', payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: 'LIKE', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};