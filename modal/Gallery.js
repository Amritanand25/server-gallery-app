import mongoose from 'mongoose';

let userSchema = new mongoose.Schema(
    {
        photo : String
    }, {collection : 'images'}
)

export default mongoose.model('images', userSchema);