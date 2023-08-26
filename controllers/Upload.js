import imageSchema from '../models/Image.js'
import UserSchema from '../models/User.js'
import PostSchema from '../models/Post.js'
import multer from 'multer'
import fs from 'fs'
import { dirname } from 'path'
import path from 'path'
import { fileURLToPath } from 'url';
import mongoose from 'mongoose'

const __filename = fileURLToPath(import.meta.url);
let __dirname = dirname(__filename);
__dirname = path.resolve(__dirname, '..')

export const uploadAvatar = async (req, res) => {
    let random = Math.random()
    try {
        const image = new imageSchema({
            url: `/uploads/${req.file.filename}`,
            userId: req.userId
        })
        await image.save()

        const user = await UserSchema.findByIdAndUpdate(req.userId,
            { avatar: { url: `/uploads/${req.file.filename}`, imgId: image._id } }, { new: true })
            .catch(err => {
                console.log(err)
                return res.status(400).json({ message: 'Неизвестная ошибка' })
            })

        res.status(200).json({ message: 'Аватар загружен!', data: image })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Ошибка при загрузке изоброжении!' })
    }
}


export const removeAvatar = async (req, res) => {
    try {
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

export const uploadImagesForUser = async (req, res) => {
    let arr = []
    try {
        const user = await UserSchema.findById(req.userId)
        for (let file of req.files) {
            arr.push(`/uploads/${file.filename}`)
            const image = new imageSchema({
                url: `/uploads/${file.filename}`,
                userId: user._id
            })
            await image.save().then((doc) => {
                user.images.push({ url: `/uploads/${file.filename}`, imgId: doc._id })
            }).catch(err => {
                res.status(400).json({ message: 'Ошибка при загрузке изоброжение!' })
                return
            })
        }
        await user.save()
        res.status(201).json({ message: "Изоброжение успешно загружены!", data: arr })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Возникло ошибка при загрузке!" })
    }
}

export const removeImageForUser = async (req, res) => {
    try {
        let filePath = __dirname + req.body.url
        const user = await UserSchema.findById(req.userId)
        const userImg = await user.images.find(item => item.userId == user._id)
        const image = await imageSchema.findById(userImg._id)
        if (!image) {
            res.status(400).json({ error: 'Не удалось удалить изоброжение!' })
            return
        }
        await image.remove()
        let index = user.images.indexOf(image._id)
        user.images.splice(index, 1)
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
                res.status(500).json({ error: 'Ошибка при удалении изоброжении!' });
                return;
            }
        });
        await user.save()
        res.status(201).json({ message: "Изоброжение успешно загружены!", data: arr })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Возникло ошибка при удалении изоброжении!", data: err })
    }
}


export const uploadImagesForPost = async (req, res) => {
    let arr = []
    try {
        const post = await PostSchema.findById(req.params.postId)
        for (let file of req.files) {
            arr.push(`/uploads/${file.filename}`)
            const image = new imageSchema({
                url: `/uploads/${file.filename}`,
                userId: req.params._id
            })
            await image.save().then((doc) => {
                post.images.push({ url: `/uploads/${file.filename}`, imgId: doc._id })
            }).catch(err => {
                res.status(400).json({ error: 'Ошибка при загрузке изоброжение!' })
                return
            })
        }
        await post.save()
        res.status(201).json({ message: "Изоброжение успешно загружены!", data: arr })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Возникло ошибка при загрузке!" })
    }
}

export const removeImageForPost = async (req, res) => {
    try {
        let filePath = __dirname + req.body.url
        const post = await PostSchema.findById(req.params.postId)
        const postImage = post.images.find(item => item.url == req.body.url)
        await imageSchema.findByIdAndDelete(postImage.imgId)
            .then(async (doc) => {
                if (doc) {
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error('Error deleting file:', err);
                            res.status(500).json({ error: 'Ошибка при удалении изоброжении!' });
                            return;
                        }
                    });
                    let index = post.images.indexOf(doc._id)
                    post.images.splice(index, 1)
                    await post.save()
                    res.status(201).json({ message: "Изоброжение успешно удален!"})
                } else {
                    res.status(400).json({ error: 'Не удалось удалить изоброжение!' })
                }
            })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Возникло ошибка при удалении изоброжении!", data: err })
    }
}
