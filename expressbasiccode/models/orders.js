const mongoose = require('mongoose');

// Initialising the mongoose Schema
const Schema = mongoose.Schema;

// Registering the City Schema
const ordersSchema = new Schema({

    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    menuItems: {
        type: Array,
        required: true
    },
    phNumber: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    subTotal: {
        type: Number,
        required: true
    },
    restaurantId: {
        type: String,
        required: true
    },
    resname: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('orders', ordersSchema, 'orders'); // exporting the model