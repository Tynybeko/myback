import mongoose from "mongoose";
const CatSchema = new mongoose.Schema({
    title: {
        require: true,
        unique: true,
        type: String,
    }
})

export default mongoose.model('Category', CatSchema)
