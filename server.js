const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');

const bootcamps = require('./routes/bootcamps');

dotenv.config({ path: './config/config.env' });

const app = express();

// dev logging middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}!`);
});
