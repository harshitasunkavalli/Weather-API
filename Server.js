const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const courseRoute = require('./Routers/courseroute');
const studentRoute=require('./Routers/studentprofile');

//EXPREE, BODY PARSER & CORS
const app = express();
app.use(bodyParser.json());
app.use(cors());

//CONNECTION ESTABLISH BETWEEN NODE.JS TO MONGODB
const MONGO_URI = 'mongodb+srv://Harshita:<hharshi16>@cluster0.k7rdcfn.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB conection error:'));

//CONTROLLERS ->PATH OF YOUR ROUTERS
app.use('/api/course', courseRoute)
app.use('/api/student',studentRoute)

//STAR YOUR SERVER
app.listen(5000, () => {
    console.log('server is running on port 5000');
})