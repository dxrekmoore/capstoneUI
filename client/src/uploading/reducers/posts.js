/*a reducer is a function, that accpets states or actions in the website, 
and it can do the corresponded actions */

//add more actions here
export default (posts = [], action) => {
  switch (action.type) {
    case 'FETCH_ALL':
      return action.payload;
    case 'CREATE':
      return [...posts, action.payload];
    case 'UPDATE':
      //posts.map will return an array => we mapping post the array, and we make change in there, and it return the changed array
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));//  action.payload is the updated post
    case 'DELETE':
      return posts.filter((post) => post._id !== action.payload);  
    default:
      return posts;
    case 'LIKE':
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
      
  }
};

