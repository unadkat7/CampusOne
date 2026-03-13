const mongoose = require('mongoose');
const { Schema } = mongoose;

const userProfileSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    collegeName: {
        type: String,
    },
    department: {
        type: String,
    },
    course: {
        type: String,
    },
    semester: {
        type: Number,
    },
    year: {
        type: Number,
    },
    phone: {
        type: String,
    },
    profilePhoto: {
        type: String,
    }
}, { timestamps: true });

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;