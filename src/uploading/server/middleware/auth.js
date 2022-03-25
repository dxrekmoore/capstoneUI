/*middleware decides if the user is allowed to operate on specific posts
for example, does the user has the right to view or delete the post
the middleware is used in the routes  */
import jwt from "jsonwebtoken";
//the secret must be the same as the controller/user.js
const secret = 'soundMapper';

const auth = async (req, res, next) => {

  try {
    const token = req.headers.authorization.split(" ")[1];
    //decide if the token is google or the customer authentication
    const isCustomAuth = token.length < 500;

    let decodedData;

    //secret is only for customer authentication
    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
    //sub is the google id being differtiated
      req.userId = decodedData?.sub;
    }    

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;