const express = require('express');
require('express-async-errors');

const cors = require('./app/middlewares/cors');
const errorHandler = require('./app/middlewares/errorHandler');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use(cors);
app.use(routes);
app.use(errorHandler);

app.listen(3130, () => console.log('Server is running on http://localhost:3130'));
