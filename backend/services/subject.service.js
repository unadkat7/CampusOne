const Subject = require('../models/Subject');
const Enrollment = require('../models/Enrollment');
const Announcement = require('../models/Announcement');

async function getAllSubjects() {
    return await Subject.find({});
}

async function getSubjectById(subjectId) {
    return await Subject.findById(subjectId);
}

async function enrollUser(userId, subjectId) {
    const enrollment = new Enrollment({
        userId,
        subjectId
    });
    return await enrollment.save();
}

async function getUserSubjects(userId) {
    // Find all enrollments for the user and populate the subject details
    const enrollments = await Enrollment.find({ userId }).populate('subjectId');
    // Map enrollments to return just the subject documents
    return enrollments.map(e => e.subjectId);
}

async function getSubjectAnnouncements(subjectId) {
    return await Announcement.find({ subjectId }).sort({ createdAt: -1 });
}

module.exports = {
    getAllSubjects,
    getSubjectById,
    enrollUser,
    getUserSubjects,
    getSubjectAnnouncements
};
