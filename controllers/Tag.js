import PostSchema from '../models/Post.js';
import tagSchema from '../models.Tag.js';


exports.addTag = async (req, res) => {
    try {
        const post = await PostSchema.findById(req.params.postId);
        const newComment = new tagSchema({ postId: post._id, text: req.body.title, userId: req.userId });
        await newComment.save();

        post.comments.push(newComment._id);
        await post.save();

        res.status(201).json({ message: 'Комментарий добавлен' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при добавлении комментария' });
    }
};

exports.removeTag = async (req, res) => {
    try {
        const comment = await tagSchema.findById(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Комментарий не найден' });
        }

        const post = await PostSchema.findById(comment.postId);
        if (!post) {
            return res.status(404).json({ message: 'Пост не найден' });
        }

        await comment.remove();

        const index = post.comments.indexOf(comment._id);
        post.comments.splice(index, 1);
        await post.save();

        res.json({ message: 'Комментарий удален' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении комментария' });
    }
};