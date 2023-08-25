import imageSchema from '../models/Image.js'
import UserSchema from '../models/User.js'
import PostSchema from '../models/Post.js'
import multer from 'multer'
import fs from 'fs'
import { dirname } from 'path'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
let __dirname = dirname(__filename);
__dirname = path.resolve(__dirname, '..')

export const uploadAvatar = async (req, res) => {
    try {

        const image = new imageSchema({
            url: `/uploads/${req.file.originalname}`,
            userId: req.userId
        })
        await image.save()

        const user = await UserSchema.findByIdAndUpdate(req.userId,
            { avatar: { url: `/uploads/${req.file.originalname}`, imgId: image._id } }, { new: true })
            .catch(err => {
                console.log(err)
                return res.status(400).json({ message: 'Неизвестная ошибка' })
            })

        res.status(200).json({ message: 'Аватар загружен!' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Ошибка при загрузке изоброжении!' })
    }
}


export const removeAvatar = async (req, res) => {
    try {
        console.log(__dirname);
        let filePath = __dirname + req.body.url
        const image = await imageSchema.findByIdAndDelete(req.body.imgId)
        const user = await UserSchema.findByIdAndUpdate(req.userId,
            { avatar: {}, }, { new: true })
            .catch(err => {
                console.log(err)
                res.status(400).json({ message: 'Неизвестная ошибка' })
                return
            })
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
                res.status(500).json({ message: 'Ошибка при удалении изоброжении!' });
                return;
            }
        });
        res.status(200).json({ message: 'Аватар удален!' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Ошибка при удалении изоброжении!' })
    }
}

