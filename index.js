import express from "express";
import mongoose from "mongoose";
import multer from 'multer'
import cors from 'cors'
import * as Validations from './utils/validations.js'
import { checkAuth, handleValidationErrors } from './utils/utils.js'
import { Users, Posts, Likes, Comment, Uploads } from "./controllers/controllers.js";
import axios from 'axios'
import currencyShcema from "./models/Currency.js";


const PORT = 4440;
const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Разрешить все домены
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Разрешенные методы
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Разрешенные заголовки
    next();
});
(async function () {
    try {
        await mongoose.connect('mongodb+srv://Tynybek:Zhanybekov@test.gluw22q.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
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
app.get('/posts/:id', Posts.getOne)
app.post('/posts/create', checkAuth, Posts.createPost)
app.delete('/posts/remove/:id', checkAuth, Posts.remove)
app.patch('/posts/update/:id', checkAuth, Posts.update)

// Images UPLOAD API
app.use('/uploads', express.static('uploads'));
const storage = multer.diskStorage(
    {
        destination: (_, __, cb) => {
            cb(null, 'uploads')
        },
        filename: (_, file, cb) => {
            cb(null, Math.random() + file.originalname)
        },

    }
)

const upload = multer({ storage })


app.post('/upload/avatar', checkAuth, upload.single('image'), Uploads.uploadAvatar)
app.post('/upload/user/images', checkAuth, upload.array('images', 3), Uploads.uploadImagesForUser)
app.delete('/remove/avatar', checkAuth, Uploads.removeAvatar)
app.delete('/remove/user/image', checkAuth, Uploads.removeImageForUser)
app.post('/upload/post/images/:postId', checkAuth, upload.array('images', 3), Uploads.uploadImagesForPost)
app.delete('/remove/post/image/:postId', checkAuth, Uploads.removeImageForPost)

// User API

app.post('/auth/login', Validations.login, handleValidationErrors, Users.login)
app.post('/auth/register', Validations.register, handleValidationErrors, Users.register)
app.patch('/auth/update/', checkAuth, Validations.updateUser, handleValidationErrors, Users.userUpdate)
app.patch('/auth/changepass/', checkAuth, Validations.changePassword, handleValidationErrors, Users.refreshPass)
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
app.get('/cryptobase', async (req, res) => {
    try {
        const { data } = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=100', {
            headers: {
                "X-CMC_PRO_API_KEY": "0650ecb7-adc0-45ef-8713-a175d0a061e4",
            }
        })
        if (data) {
            res.status(200).json(data.data)
            return
        }
        res.status(400).json({
            error: 'Ошибка!'
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Ошибка при получении данных!' })
    }

})





app.get('/currencyAPI', async (req, res) => {
    try {
        const data = await currencyShcema.findById('651ba3eee0e6832d90d51885')


        if (data) {
            if (+new Date(data?.updatedAt) + 135920 <= +new Date()) {
                const res = await axios.get('https://data.fx.kg/api/v1/central', {
                    headers: {
                        "Authorization": "Bearer U8FciHxhkitCtndOEZCQOeKvyaQ4tlrelDWyerrAd184dc5b"
                    },
                })
                data.data = res.data
                data.updatedAt = new Date()
                let newCurrency = await data.save()
            }
            res.status(200).json(data)
        } else {
            res.status(400).json({ error: 'Произошла ошибка при получении котировки!' })
        }
    } catch (e) {
        res.status(500).json({ error: 'Произошла ошибка!' })
    }

})

