import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

//initialize this app
const app = express();

/* general setup */
//limit to the data uploaded 
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

//every routes inside posts will start posts, so it changes reaction path to localhost:5000/posts
app.use('/api/posts', postRoutes);

//connecting to the mongodb, with name dev_user1, and password dev_user1
const CONNECTION_URL = 'mongodb+srv://dev_user1:dev_user1@cluster0.tl0um.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));


