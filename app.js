const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

// ROUTES
const authRoute = require('./routes/Auth.route');
const planRoute = require('./routes/Plan.route');
const taskRoute = require('./routes/Task.route');

// CONFIG
const PORT = config.get('port') || 5000;
const MONGO_URI = config.get('mongoUri');

const app = express();
app.use(express.json({ extended: true }));

app.use('/auth', authRoute);
app.use('/plans', planRoute);
app.use('/tasks', taskRoute)

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