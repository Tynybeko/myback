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
        type: Buffer
    },
    images: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Image'
        }
    ],
    private: {
        type: Boolean,
        default: false
    },
    likePost: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
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