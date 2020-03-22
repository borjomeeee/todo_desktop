const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const path = require('path');

// ROUTES
const authRoute = require('./routes/Auth.route');
const planRoute = require('./routes/Plan.route');
const taskRoute = require('./routes/Task.route');

// CONFIG
const PORT = config.get('port');
const MONGO_URI = config.get('mongoUri');

const app = express();
app.use(express.json({ extended: true }));

app.use(express.static(__dirname + '/client/build'));

app.use('/auth', authRoute);
app.use('/plans', planRoute);
app.use('/tasks', taskRoute);

app.get('*', (req, res) =>  res.sendFile(path.join(__dirname, "client", "build", "index.html")));

async function start() {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`) );
    } catch (e) {
        console.log('Server error!', e.message);
        process.exit(1);
    }
}

start();