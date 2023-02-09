const mongoose = require('mongoose');

const localENV = require('../localenv/localenv');

mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGODB_URI || localENV.LOCAL_MONGODB_URI, { useUnifiedTopology: true }, (err) => {
    if (!err) { console.log('MongoDB connection succeeded.'); }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});

require('./user.model');
require('./orders.model');
require('./pricing-plans.model');
require('./contact-details.model');
require('./testimonials.model');