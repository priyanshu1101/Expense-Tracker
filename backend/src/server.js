const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const expenseRoutes = require('./routes/expenseRoutes');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config();

const PORT = process.env.PORT || 3000;
const CONNECTION_URL = process.env.CONNECTION_URL;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', expenseRoutes);

app.use(express.static(path.join(__dirname, '../../frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
});

mongoose
    .connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => {
        console.log("Server is active on port: " + PORT);
    }))
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });