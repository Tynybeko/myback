import PostSchema from '../models/Post.js';
import commentSchema from '../models/Comment.js';


export const addComment = async (req, res) => {
    try {
        const post = await PostSchema.findById(req.params.postId);
        const newComment = new commentSchema({ postId: post._id, text: req.body.text, userId: req.userId });
        await newComment.save();

        post.comments.push(newComment._id);
        await post.save();

        res.status(201).json({ message: 'Комментарий добавлен' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при добавлении комментария' });
    }
};

export const removeComment = async (req, res) => {
    try {
        const comment = await commentSchema.findById(req.params.commentId);
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