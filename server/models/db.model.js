const mongoose = require('mongoose');

const LOCAL_MONGODB_URI = "mongodb+srv://manjeetuser:manjeet@employee-database.dxtzx.mongodb.net/balance-dyte?retryWrites=true&w=majority";

mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGODB_URI || LOCAL_MONGODB_URI, { useUnifiedTopology: true }, (err) => {
    if (!err) { console.log('MongoDB connection succeeded.'); }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});

require('./user.model');