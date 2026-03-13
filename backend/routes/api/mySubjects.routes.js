const express = require('express');
const router = express.Router();
const subjectControllers = require('../../controllers/subject.controller');
const auth = require('../../middleware/auth');

router.get('/', auth, subjectControllers.getMySubjects);

module.exports = router;
