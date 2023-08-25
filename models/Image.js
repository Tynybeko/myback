import mongoose from "mongoose";


const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

export default mongoose.model('Image', imageSchema)