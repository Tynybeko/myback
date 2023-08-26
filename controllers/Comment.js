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
        const comment = await commentSchema.findByIdAndDelete(req.params.commentId)
            .then(async (doc) => {
                if (doc) {
                    const post = await PostSchema.findById(doc.postId);
                    if (!post) {
                        return res.status(404).json({ message: 'Пост не найден' });
                    }
                    const index = post.comments.indexOf(doc._id);
                    post.comments.splice(index, 1);
                    await post.save();
                    res.json({ message: 'Комментарий удален' });
                } else {
                    res.status(400).json({ error: "Произошла ошибка" })
                }
            })



    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Ошибка при удалении комментария' });
    }
};