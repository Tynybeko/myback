import mongoose from "mongoose"



const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    images: [
        {
            type: Buffer,
        }
    ],
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    viewCount: {
        type: Number,
        default: 0
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Like"
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
}, {
    timestamps: true,
},
)

export default mongoose.model('Post', PostSchema)