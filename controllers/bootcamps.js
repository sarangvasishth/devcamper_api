// @desc Get all bootcamps
// @route Get /api/v1/bootcamps
// @access Public
exports.getBootCamps = (req, res, next) => {
	res.status(200).json({
		success: true,
		msg: 'Show all bootcamps',
	});
};
// @desc Get a bootcamp
// @route Get /api/v1/bootcamps/:id
// @access Public
exports.getBootCamp = (req, res, next) => {
	res.status(200).json({
		success: true,
		msg: 'Show one bootcamp',
	});
};

// @desc Create new bootcamps
// @route POST /api/v1/bootcamps
// @access Private
exports.createBootCamp = (req, res, next) => {
	res.status(200).json({
		success: true,
		msg: 'Create new bootcamp',
	});
};

// @desc Update a bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access Private
exports.updateBootCamp = (req, res, next) => {
	res.status(200).json({
		success: true,
		msg: `Update bootcamp ${req.params.id}`,
	});
};

// @desc Delete a bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access Private
exports.deleteBootCamp = (req, res, next) => {
	res.status(200).json({
		success: true,
		msg: `Delete bootcamp ${req.params.id}`,
	});
};
