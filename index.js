const express = require('express');
const bodyParser = require('body-parser')

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('api/get', (req,  res) => {
    res.json(`Hello get ${req.params}`);
});

app.post('api/post', (req, res) => {
    res.json(`Hello post ${req.params}`);
})

app.put('api/put', (req, res) => {
    const {id} = req.params;
    
    const {title} = req.body;
    res.json(`Hello put ${id} title: ${title}`);
})

const PORT = process.env.port || 3000;
app.listen(PORT,  () => {
    console.log(`Server is running port ${POSRT}`);
});