const slugify = require('slugify');
const moongoose = require('mongoose');
const geoCoder = require('../utils/geoCoder');

const BootcampSchema = new moongoose.Schema(
	{
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
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

BootcampSchema.path('website').validate((val) => {
	const urlRegex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
	return urlRegex.test(val);
}, 'Please use a valid URL with HTTP or HTTPS');

BootcampSchema.path('email').validate((val) => {
	const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return emailRegex.test(String(val).toLowerCase());
}, 'Please enter a valid Email');

BootcampSchema.pre('save', function (next) {
	console.log('Slugify ran!!', this.name);
	this.slug = slugify(this.name, { lower: true });
	next();
});

BootcampSchema.pre('save', async function (next) {
	const loc = await geoCoder.geocode(this.address);
	this.location = {
		type: 'Point',
		coordinates: [loc[0].longitude, loc[0].latitude],
		formattedAddress: loc[0].formattedAddress,
		street: loc[0].streetName,
		city: loc[0].city,
		state: loc[0].stateCode,
		zipcode: loc[0].zipcode,
		country: loc[0].countryCode,
	};

	// remove address
	this.address = undefined;
	next();
});

BootcampSchema.pre('remove', async function (next) {
	console.log(`Courses being removed from bootcamp ${this._id}`);
	await this.model('Course').deleteMany({ bootcamp: this._id });
	next();
});

// Reverse populate with virtuals
BootcampSchema.virtual('courses', {
	ref: 'Course',
	localField: '_id',
	foreignField: 'bootcamp',
	justOne: false,
});

module.exports = moongoose.model('Bootcamp', BootcampSchema);
