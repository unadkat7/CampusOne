const userProfileService = require('../services/userProfile.service');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/response');
const { STATUS_CODE } = require('../utils/constants');

async function getProfile(req, res) {
    try {
        const userId = req.user.id; // User ID extracted from the JWT token via auth middleware

        if (!userId) {
            return sendErrorResponse(
                res,
                "User ID not found in token",
                {},
                STATUS_CODE.BAD_REQUEST
            );
        }

        const profile = await userProfileService.getProfileByUserId(userId);

        if (!profile) {
             return sendErrorResponse(
                res,
                "Profile not found",
                {},
                STATUS_CODE.NOT_FOUND
            );
        }

        return sendSuccessResponse(
            res,
            profile,
            "Profile Retrieved Successfully",
            STATUS_CODE.OK
        );
    } catch (err) {
        return sendErrorResponse(
            res,
            `Error Retrieving Profile: ${err.message}`,
            {},
            STATUS_CODE.INTERNAL_SERVER_ERROR
        );
    }
}

async function updateProfile(req, res) {
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

        const profileData = req.body;
        
        // Ensure userId from token is not overridden
        delete profileData.userId; 

        const updatedProfile = await userProfileService.upsertProfile(userId, profileData);

        return sendSuccessResponse(
            res,
            updatedProfile,
            "Profile Updated Successfully",
            STATUS_CODE.OK
        );
    } catch (err) {
        return sendErrorResponse(
            res,
            `Error Updating Profile: ${err.message}`,
            {},
            STATUS_CODE.INTERNAL_SERVER_ERROR
        );
    }
}

module.exports = {
    getProfile,
    updateProfile
};