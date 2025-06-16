import mongoose, { mongo } from "mongoose";
const {Schema} = mongoose;


const File = new Schema({
    filename: String,
    type: String,
    size: Number
})


export default mongoose.model("File", File)