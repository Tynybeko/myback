import mongoose, { Schema } from 'mongoose'


const currencyShcema = new mongoose.Schema({
    data: {
        type: Schema.Types.Mixed,
        required: true
    }
}, {
    timestamps: true
});


export default mongoose.model('Currency', currencyShcema);
