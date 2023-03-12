import express from 'express';
import postRouter from "./controller/post-router.js"
import userRouter from "./controller/user-router.js"
import cors  from 'cors';
const app = express(); //initialize the express application

// middleware
app.use(cors());
app.use(express.json()); // express.json() is a built-in middleware  that parses incoming request bodies in JSON format.
app.use(express.urlencoded({ extended: true }));//a built-in middleware that parses incoming request bodies in x-www-form-urlencoded format, with the option "extended: true" allowing for rich objects and arrays to be encoded into the URL-encoded format.

app.use("/posts",postRouter)
app.use("/users",userRouter)


export default app;