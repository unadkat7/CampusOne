const UserProfile = require('../models/UserProfile');

async function getProfileByUserId(userId) {
    return await UserProfile.findOne({ userId });
}

async function upsertProfile(userId, profileData) {
    const filter = { userId };
    const update = { ...profileData, userId };
    const options = { new: true, upsert: true, runValidators: true };

    return await UserProfile.findOneAndUpdate(filter, update, options);
}

module.exports = {
    getProfileByUserId,
    upsertProfile
};