const subjectService = require('../services/subject.service');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/response');
const { STATUS_CODE } = require('../utils/constants');

async function getSubjects(req, res) {
    try {
        const subjects = await subjectService.getAllSubjects();

        return sendSuccessResponse(
            res,
            subjects,
            "Subjects Retrieved Successfully",
            STATUS_CODE.OK
        );
    } catch (err) {
        return sendErrorResponse(
            res,
            `Error Retrieving Subjects: ${err.message}`,
            {},
            STATUS_CODE.INTERNAL_SERVER_ERROR
        );
    }
}

async function getSubject(req, res) {
    try {
        const subjectId = req.params.id;

        if (!subjectId) {
            return sendErrorResponse(
                res,
                "Subject ID is required",
                {},
                STATUS_CODE.BAD_REQUEST
            );
        }

        const subject = await subjectService.getSubjectById(subjectId);

        if (!subject) {
            return sendErrorResponse(
                res,
                "Subject Not Found",
                {},
                STATUS_CODE.NOT_FOUND
            );
        }

        return sendSuccessResponse(
            res,
            subject,
            "Subject Retrieved Successfully",
            STATUS_CODE.OK
        );
    } catch (err) {
        return sendErrorResponse(
            res,
            `Error Retrieving Subject: ${err.message}`,
            {},
            STATUS_CODE.INTERNAL_SERVER_ERROR
        );
    }
}

async function enroll(req, res) {
    try {
        const userId = req.user.id;
        const subjectId = req.params.id;

        if (!userId) {
            return sendErrorResponse(
                res,
                "User ID not found in token",
                {},
                STATUS_CODE.BAD_REQUEST
            );
        }

        if (!subjectId) {
            return sendErrorResponse(
                res,
                "Subject ID is required",
                {},
                STATUS_CODE.BAD_REQUEST
            );
        }

        const subject = await subjectService.getSubjectById(subjectId);
        if (!subject) {
             return sendErrorResponse(
                res,
                "Subject Not Found",
                {},
                STATUS_CODE.NOT_FOUND
            );
        }

        const enrollment = await subjectService.enrollUser(userId, subjectId);

        return sendSuccessResponse(
            res,
            enrollment,
            "Successfully enrolled in subject",
            STATUS_CODE.CREATED || 201
        );
    } catch (err) {
        if (err.code === 11000) {
            return sendErrorResponse(
                res,
                "User is already enrolled in this subject",
                {},
                STATUS_CODE.BAD_REQUEST
            );
        }
        return sendErrorResponse(
            res,
            `Error Enrolling User: ${err.message}`,
            {},
            STATUS_CODE.INTERNAL_SERVER_ERROR
        );
    }
}

async function getMySubjects(req, res) {
    try {
        const userId = req.user.id;

        if (!userId) {
            return sendErrorResponse(
                res,
                "User ID not found in token",
                {},
                STATUS_CODE.BAD_REQUEST
            );
        }

        const subjects = await subjectService.getUserSubjects(userId);

        return sendSuccessResponse(
            res,
            subjects,
            "Enrolled Subjects Retrieved Successfully",
            STATUS_CODE.OK
        );
    } catch (err) {
        return sendErrorResponse(
            res,
            `Error Retrieving Enrolled Subjects: ${err.message}`,
            {},
            STATUS_CODE.INTERNAL_SERVER_ERROR
        );
    }
}

async function getAnnouncements(req, res) {
    try {
        const subjectId = req.params.id;

        if (!subjectId) {
            return sendErrorResponse(
                res,
                "Subject ID is required",
                {},
                STATUS_CODE.BAD_REQUEST
            );
        }

        const subject = await subjectService.getSubjectById(subjectId);
        if (!subject) {
             return sendErrorResponse(
                res,
                "Subject Not Found",
                {},
                STATUS_CODE.NOT_FOUND
            );
        }

        const announcements = await subjectService.getSubjectAnnouncements(subjectId);

        return sendSuccessResponse(
            res,
            announcements,
            "Announcements Retrieved Successfully",
            STATUS_CODE.OK
        );
    } catch (err) {
        return sendErrorResponse(
            res,
            `Error Retrieving Announcements: ${err.message}`,
            {},
            STATUS_CODE.INTERNAL_SERVER_ERROR
        );
    }
}

module.exports = {
    getSubjects,
    getSubject,
    enroll,
    getMySubjects,
    getAnnouncements
};
