import mongoose from "mongoose"



const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    sex: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phonenumber: {
        type: String,
        required: true,
        unique: true,
    },
    avatar: {
        imgId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Image'
        },
        url: {
            type: String
        }
    },
    images: [
        {
            url: {
                type: String,
            },
            imgId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Image'
            }
        }
    ],
    private: {
        type: Boolean,
        default: false
    },
    likePost: [
        {
            likeId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Like'
            },
            postId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Post'
            },
            postTitle: String
        }
    ],
    favoritePost: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Favorite'
        }
    ],
}, {
    timestamps: true,
},
)

export default mongoose.model('User', UserSchema)