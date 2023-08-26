import mongoose from 'mongoose'


const likeSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    userId: { type: mongoose.Schema.Types.ObjectId, red: 'User'}
}, {
    timestamps: true
});


export default mongoose.model('Like', likeSchema);
