const moongoose = require('mongoose');

const CourseSchema = new moongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: [true, 'Please add a course title'],
	},
	description: {
		type: String,
		required: [true, 'Please add a description'],
	},
	weeks: {
		type: String,
		required: [true, 'Please add number of weeks'],
	},
	tuition: {
		type: Number,
		required: [true, 'Please add a tuition cost'],
	},
	minimumSkill: {
		type: String,
		required: [true, 'Please add a minimum skill'],
		enum: ['beginner', 'intermediate', 'advanced'],
	},
	scholarshipsAvailable: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	bootcamp: {
		type: moongoose.Schema.ObjectId,
		ref: 'Bootcamp',
		required: true,
	},
});

CourseSchema.statics.getAverageCost = async function (bootcampId) {
	const obj = await this.aggregate([
		{
			$match: { bootcamp: bootcampId },
		},
		{
			$group: {
				_id: '$bootcamp',
				averageCost: { $avg: '$tuition' },
			},
		},
	]);

	try {
		await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
			averageCost: Math.ceil(obj[0].averageCost / 10) * 10,
		});
	} catch (err) {
		console.log(err);
	}
};

CourseSchema.post('save', function () {
	this.constructor.getAverageCost(this.bootcamp);
});
CourseSchema.pre('remove', function () {
	this.constructor.getAverageCost(this.bootcamp);
});

module.exports = moongoose.model('Course', CourseSchema);
