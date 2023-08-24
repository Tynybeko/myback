import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
const PORT = 5555
const app = express()
app.use(express.json())
app.use(cors())

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://Tynybek:Zhanybekov@test.gluw22q.mongodb.net/?retryWrites=true&w=majority')
        app.listen(PORT, () => {
            console.log('Server started on port', PORT);
        })
    } catch (err) {
        console.log(err, "NOT WORK");
    }
}

start()
app.get('/post', (req, res) => {
    res.json({
        id: 1,
        name: "ISSS"
    })
})
