const express = require('express');
const bodyParser = require('body-parser')

// Routing
const indexRouter = require('./routers/index');
const advertisementRouter = require('./routers/advertisement')

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', indexRouter);
app.use('/api', advertisementRouter);

const PORT = process.env.port || 3000;
app.listen(PORT,  () => {
    console.log(`Server is running port ${PORT}`);
});