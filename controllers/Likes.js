import postSchema from '../models/Post.js'
import likeSchema from '../models/Like.js'
import UserSchema from '../models/User.js'



export const addLike = async (req, res) => {
    try {
        const post = await postSchema.findById(req.params.postId);
        if (!post) {
            return res.status(400).json({message: 'Пост не найден или не доступен!'})
        }
        const user = await UserSchema.findById(req.userId)
        const newLike = new likeSchema({ postId: post._id, userId: req.userId });
        await newLike.save();

        user.likePost.push(newLike._id)
        post.likes.push(newLike._id);
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
            return res.status(404).json({ message: 'Лайк не найден' });
        }

        await like.remove();

        const index = post.likes.indexOf(like._id);
        const userPostIndex = user.likePost.indexOf(like._id)
        post.likes.splice(index, 1);
        user.likePost.splice(userPostIndex, 1)
        await post.save();
        await user.save()

        res.json({ message: 'Лайк удален' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении лайка' });
    }
};
