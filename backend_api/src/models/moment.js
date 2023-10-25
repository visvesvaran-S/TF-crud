const mongoose = require('mongoose');


const addMoments = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },

})

module.exports = mongoose.model("momentsData",addMoments)