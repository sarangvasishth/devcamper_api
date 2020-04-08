const moongoose = require('mongoose');
const BootcampSchema = new moongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please add a name'],
		unique: true,
		trim: true,
		maxlength: [50, 'Name cannot exceed more than 50 characters'],
	},
	slug: String,
	description: {
		type: String,
		required: [true, 'Please add a description'],
		maxlength: [500, 'Description cannot exceed more than 500 characters'],
	},
	website: {
		type: String,
	},
	phone: {
		type: String,
		maxlength: [20, 'Phone number can not be longer than 20 characters'],
	},
	email: {
		type: String,
	},
	address: {
		type: String,
		required: [true, 'Please add an address'],
	},
	location: {
		type: {
			type: String,
			enum: ['Point'],
			// required: true,
		},
		coordinates: {
			type: [Number],
			// required: true,
			index: '2dsphere',
		},
		formattedAddress: String,
		street: String,
		city: String,
		state: String,
		zipCode: String,
		country: String,
	},
	careers: {
		type: [String],
		required: true,
		enum: ['Web Development', 'Mobile Development', 'UI/UX', 'Data Science', 'Business', 'Other'],
	},
	averageRating: {
		type: Number,
		min: [1, 'Rating must be atleast 1'],
		max: [10, 'Rating must be not exceed 10'],
	},
	averageCost: Number,
	photo: {
		type: String,
		default: 'no-photo.jpg',
	},

	housing: {
		type: Boolean,
		default: false,
	},
	jobAssistance: {
		type: Boolean,
		default: false,
	},
	jobGuarantee: {
		type: Boolean,
		default: false,
	},
	acceptGi: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

BootcampSchema.path('website').validate((val) => {
	const urlRegex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
	return urlRegex.test(val);
}, 'Please use a valid URL with HTTP or HTTPS');

BootcampSchema.path('email').validate((val) => {
	const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return emailRegex.test(String(val).toLowerCase());
}, 'Please enter a valid Email');

module.exports = moongoose.model('Bootcamp', BootcampSchema);
