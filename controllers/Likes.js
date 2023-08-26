import postSchema from '../models/Post.js'
import likeSchema from '../models/Like.js'
import UserSchema from '../models/User.js'



export const addLike = async (req, res) => {
    try {
        const post = await postSchema.findById(req.params.postId);
        if (!post) {
            return res.status(400).json({ error: 'Пост не найден или не доступен!' })
        }
        const user = await UserSchema.findById(req.userId)
        if (post.likes.some(item => item.userId == req.userId)) {
            res.status(400).json({ error: 'Лайк уже поставлен!' })
            return
        }
        const newLike = new likeSchema({ postId: post._id, userId: req.userId })
        user.likePost.push({ likeId: newLike._id, postId: post._id, postTitle: post.name })
        post.likes.push({ likeId: newLike._id, userId: user._id, userName: user.name });
        await newLike.save();
        await post.save();
        await user.save();

        res.status(201).json({ message: 'Лайк добавлен' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при добавлении лайка' });
    }
};

export const removeLike = async (req, res) => {
    try {
        const user = await UserSchema.findById(req.userId);
        const post = await postSchema.findById(req.params.postId);
        const like = await likeSchema.findOne({ postId: post._id });

        if (!like) {
            return res.status(404).json({ error: 'Лайк не найден' });
        }


        const index = post.likes.findIndex(item => item.likeId == like._id);
        const userPostIndex = user.likePost.findIndex(item => item.likeId == like._id);
        post.likes.splice(index, 1);
        user.likePost.splice(userPostIndex, 1)
        await likeSchema.findByIdAndDelete({ _id: like._id })
            .then(doc => {
                if (!doc) {
                    res.status(400).json({ error: "Произошла ошибка при удалении" })
                }
            })
        await post.save();
        await user.save()


        res.json({ message: 'Лайк удален' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Ошибка при удалении лайка' });
    }
};


