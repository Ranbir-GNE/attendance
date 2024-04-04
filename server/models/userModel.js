import mongoose from 'mongoose';

const userSchema =new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
    },
    attendedClass:{
        type:Number,
        required:true
    },
    totalClass:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    key:{
        type:String,
    }
})

export default mongoose.model('User', userSchema);