import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import * as Validations from './utils/validations.js'
import { checkAuth, handleValidationErrors } from './utils/utils.js'
import { Users, Posts, Likes, Comment } from "./controllers/controllers.js";



const PORT = 5555;
const app = express();
app.use(express.json());
app.use(cors());
(async function () {
    try {
        await mongoose.connect('mongodb+srv://Tynybek:Zhanybekov@test.gluw22q.mongodb.net/?retryWrites=true&w=majority')
            .then(() => console.log("MONGO DB OK"))
            .catch((err) => console.log(err, "ERROR MONGO"))
        app.listen(PORT, () => {
            console.log('Server started on port', PORT);
        })
    } catch (err) {
        console.log(err, "NOT WORK");
    }
}())


// Posts API


app.get('/posts', Posts.getAll)
app.get('/posts/:id', checkAuth, Posts.getOne)
app.post('/posts/create', checkAuth, Posts.createPost)
app.delete('/posts/remove/:id', checkAuth, Posts.remove)
app.patch('/posts/update/:id', checkAuth, Posts.update)


// User API

app.post('/auth/login', Validations.login, handleValidationErrors, Users.login)
app.post('/auth/register', Validations.register, handleValidationErrors, Users.register)
app.patch('/auth/update/:id', checkAuth, Users.userUpdate)
app.get('/auth/me', checkAuth, Users.getMe)


// Category API

app.get('/categories', Posts.CatGetAll)
app.get('/categories/:id', checkAuth, Posts.CatGetOne)
app.post('/categories/create', checkAuth, Posts.createCategory)
app.delete('/categories/remove/:id', checkAuth, Posts.catRemove)
app.patch('/categories/update/:id', checkAuth, Posts.catUpdate)


// Likes API 

app.post('/like/:postId', checkAuth, Likes.addLike)
app.delete('/like/:postId', checkAuth, Likes.removeLike)


// Comment API
app.post('/comment/:postId', checkAuth, Comment.addComment);
app.delete('/comment/:commentId', checkAuth, Comment.removeComment);



