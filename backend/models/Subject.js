const mongoose = require('mongoose');
const { Schema } = mongoose;

const subjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    semester: {
        type: Number,
        required: true
    },
    department: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
