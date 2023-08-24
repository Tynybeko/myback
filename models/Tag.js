import mongoose from 'mongoose'


const tagSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    title: {
        type: String,
    }
});


export default mongoose.model('Tag', tagSchema);
