import mongoose from "mongoose";
const CatSchema = new mongoose.Schema({
    title: {
        require: true,
        unique: true,
        type: String,
    },
    postsCount: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
})

export default mongoose.model('Category', CatSchema)
