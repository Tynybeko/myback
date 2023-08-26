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
            url: {
                type: String,
            },
            imgId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Image"
            }
        }
    ],
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    categoryTitle: {
        type: String,
    },
    viewCount: {
        type: Number,
        default: 0
    },
    likes: [
        {
            likeId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Like"
            },
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            userName: {
                type: String,
            }

        },

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