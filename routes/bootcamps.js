const express = require('express');
const {
	getBootCamp,
	getBootCamps,
	createBootCamp,
	updateBootCamp,
	deleteBootCamp,
	getBootCampsInRadius,
	bootcampPhotoUpload,
} = require('../controllers/bootcamps');
const router = express.Router();

const coursesRouter = require('./courses');

const Bootcamp = require('../models/Bootcamp');
const advancedResults = require('../middleware/advancedResults');

// Reroute into other routers
router.use('/:bootcampId/courses', coursesRouter);

router.route('/').get(advancedResults(Bootcamp, 'courses'), getBootCamps).post(createBootCamp);

router.route('/:id').get(getBootCamp).put(updateBootCamp).delete(deleteBootCamp);
router.route('/radius/:zipcode/:distance').get(getBootCampsInRadius);

router.route('/:id/photo').put(bootcampPhotoUpload);

module.exports = router;
