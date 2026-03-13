const express = require('express');
const router = express.Router();
const subjectControllers = require('../../controllers/subject.controller');
const auth = require('../../middleware/auth');

router.get('/', auth, subjectControllers.getSubjects);
router.get('/:id', auth, subjectControllers.getSubject);
router.post('/:id/enroll', auth, subjectControllers.enroll);
router.get('/:id/announcements', auth, subjectControllers.getAnnouncements);

module.exports = router;
