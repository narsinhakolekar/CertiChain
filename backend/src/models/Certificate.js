import mongoose from "mongoose";


const certificateSchema = new mongoose.Schema({

    certificateId:{
        type:String,
        required:true,
        unique:true
    },

    documentHash:{
        type:String
    },

    ipfsCID:{
        type:String
    },

    issuerWallet:{
        type:String
    },

    university:{
        type:String
    },

    issuedAt:{
        type:Date,
        default:Date.now
    },

    status:{
        type:String,
        default:"Active"
    }

});


const Certificate =
mongoose.model(
    "Certificate",
    certificateSchema
);


export default Certificate;