import PostSchema from '../models/Post.js'
import CatSchema from '../models/Category.js'

export const CatGetOne = async (req, res) => {
    try {
        const categoryId = req.params.id;
        CatSchema.findOneAndUpdate(
            {
                _id: categoryId,
            },
            {
                returnDocument: 'after',
            },
        ).then((doc) => {
            if (!doc) {
                return res.status(404).json({
                    message: 'Не найдено'
                })
            }
            res.json(doc)
        },)
    } catch (err) {
        res.status(500).json({
            message: 'Не получилось получить доступ!'
        });
    }
}

export const CatGetAll = async (req, res) => {
    try {
        const category = await CatSchema.find()
        res.json(category)
    } catch (err) {
        res.status(500).json({
            message: 'Не получилось получить доступ!'
        });
    }
}



export const createCategory = async (req, res) => {
    try {
        const doc = new CatSchema({
            title: req.body.title,
        })

        const category = await doc.save();

        res.status(200).json(category)
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось добавить категорию'
        })
    }
}


export const catRemove = async (req, res) => {
    try {
        const categoryId = req.params.id;
        CatSchema.findOneAndDelete(
            {
                _id: categoryId,
            },
        ).then((doc) => {
            if (!doc) {
                return res.status(404).json({
                    message: 'Не найдено!'
                })
            }
            res.json({
                message: 'Категория удалена!'
            })
        },)
    } catch (err) {
        res.status(500).json({
            message: 'Не получилось получить доступ!'
        });
    }
}


export const catUpdate = async (req, res) => {
    try {
        const categoryId = req.params.id;
        CatSchema.findOneAndUpdate(
            {
                _id: categoryId,
            },
            {
                title: req.body.title,
            }
        ).then((doc) => {
            if (!doc) {
                return res.status(404).json({
                    message: 'Не найдено!'
                })
            }
            res.json({
                message: 'Категория обнавлена!'
            })
        },)
    } catch (err) {
        res.status(500).json({
            message: 'Не получилось получить доступ!'
        });
    }
}


export const createPost = async (req, res) => {
    try {

        const catId = await CatSchema.findById(req.body.categoryId)
        if (!catId) {
            return res.status(400).json({ message: 'Неправильно указан катаегория!' })
        }
<<<<<<< HEAD
=======
        const images = req.body.images.map(file => {
            return {
                data: file.buffer,
                contentType: file.mimetype
            };
        });
>>>>>>> 93744971cd49499f8c72ae52b3136547ba62402a
        const doc = new PostSchema({
            title: req.body.title,
            desc: req.body.desc,
            categoryId: catId._id,
            user: req.userId,
        })
        const post = await doc.save();
        res.status(200).json(post)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось опубликовать пост!'
        })
    }
}


export const getAll = async (req, res) => {
    try {
        const posts = await PostSchema.find()
        res.json(posts)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не получилось получить доступ!'
        });
    }
}


export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        PostSchema.findOneAndUpdate(
            {
                _id: postId,
            },
            {
                $inc: { viewCount: 1 },
            },
            {
                returnDocument: 'after',
            },
        ).then((doc) => {
            if (!doc) {
                return res.status(404).json({
                    message: 'Не найдено'
                })
            }
            res.json(doc)
        },)
    } catch (err) {
        res.status(500).json({
            message: 'Не получилось получить доступ!'
        });
    }
}

export const remove = async (req, res) => {
    try {
        const foodId = req.params.id;
        FoodSchema.findOneAndDelete(
            {
                _id: foodId,
            },
        ).then((doc) => {
            if (!doc) {
                return res.status(404).json({
                    message: 'Не найдено!'
                })
            }
            res.json({
                message: 'Пост удален!'
            })
        },)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не получилось получить доступ!'
        });
    }
}


export const update = async (req, res) => {
    try {
        const catId = await CatSchema.findById(req.body.categoryId)
        if (!catId) {
            return res.status(400).json({ message: 'Неправильно указан катаегория!' })
        }
        const images = req.body.files.map(file => {
            return {
                data: file.buffer,
                contentType: file.mimetype
            };
        });
        const foodId = req.params.id;
        FoodSchema.findOneAndUpdate(
            {
                _id: foodId,
            },
            {
                title: req.body.title,
                desc: req.body.desc,
                images: images,
                categoryId: catId._id,
                user: req.userId,
            }
        ).then((doc) => {
            if (!doc) {
                return res.status(404).json({
                    message: 'Не найдено!'
                })
            }
            res.json({
                message: 'Товар обнавлен!'
            })
        },)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не получилось получить доступ!'
        });
    }
}
