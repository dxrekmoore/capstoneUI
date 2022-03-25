import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';

//we can use all the functions in the brakcet
export const reducers = combineReducers({ posts, auth });
