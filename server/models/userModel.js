import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    courseNumber: {
        type: Number,
        required: true,
        unique: true
    },
    attendedClass: {
        type: Number,
        default: 0
    },
    totalClass: {
        type: Number,
        default: 0
    }
});

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
    },
    courses: [courseSchema], // Array of course schemas
    password: {
        type: String,
        required: true
    },
    key: {
        type: String,
    }
});

export default mongoose.model('User', userSchema);
