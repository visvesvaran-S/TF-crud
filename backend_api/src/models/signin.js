const mongoose = require('mongoose');


const signinUser = new mongoose.Schema({

    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }

})

module.exports = mongoose.model('sigindata',signinUser)