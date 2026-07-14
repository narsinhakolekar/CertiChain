import mongoose from "mongoose";


const universitySchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    wallet:{
        type:String,
        required:true
    },

    website:{
        type:String,
        default:""
    }

},
{
    timestamps:true
});


const University =
mongoose.model(
    "University",
    universitySchema
);


export default University;