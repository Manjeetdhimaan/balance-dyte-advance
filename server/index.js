// require('dotenv').config();

require('./models/db.model');
require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const path = require('path');
const compression = require('compression')

const localENV = require('./localenv/localenv');
const userRoutes = require('./routes/user.routes');
const pricingPlanRoutes = require('./routes/pricing-plans.routes');

const PORT = process.env.PORT || localENV.LOCAL_PORT;
// const rtsAdmin = require('./routes/admin.router');

const app = express();
app.use(cors());
app.use(compression());

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(passport.initialize());
app.use('/api/user', userRoutes);
app.use('/api/plans', pricingPlanRoutes);
// app.use('/api/admin', rtsAdmin);

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        const valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors);
    }
    if (err.statusCode === 401 && err.error.code === 'BAD_REQUEST_ERROR') {
        res.status(401).send({
            success: false,
            message: err.error.description,
        });
    } else {
        res.status(401).send(err);
    }
});
// app.use("/images", express.static(path.join(__dirname, "images")));

app.use(express.static(path.join(__dirname, 'www')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'www/index.html'));
});

// start server
app.listen(PORT, () => console.log(`Server started at port : ${PORT}`));