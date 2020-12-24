const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// app
const app = express();

mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	})
	.then(() => console.log('DB CONNECTED'))
	.catch((err) => console.log('DB CONNECTION ERR', err));

app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(cors());

app.get('/api', (req, res) => {
	res.json({
		data: 'hey your hit ndoe api'
	});
});

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
