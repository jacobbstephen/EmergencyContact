const express = require('express');
const app = express();
const PORT = 3000;

const dotenv = require('dotenv');
dotenv.config();

const connectToDB = require('./config/db')
connectToDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

const emergencyRouter = require('./routes/index.routes')
app.use('/emergency', emergencyRouter);

app.listen(PORT, () => {
    console.log('Server Running on port 3000');
})