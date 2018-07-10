/*jshint esversion: 6 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const NewsLetterSchema = mongoose.Schema({
    userid: {
        type: String
    },
    documentname: {
        type: String
    },
    departmentname: {
        type: String
    },
    HRmarkup: {
        type: String
    },
    Amarkup:{
        type:String
    },
    Mrmarkup:{
        type:String
    },
    createdate: {
        type: Date,
        Default: Date.now
    },
    createdby: {
        type: String
    }

});
const NewsLetterStore = module.exports = mongoose.model('NewsLetterStore', NewsLetterSchema);

module.exports.storeNewsLetter = function (NewsLetter, callback) {
    NewsLetter.save(callback);
};

// Individual User NewsLetter
module.exports.getUserNewsLetter = function (id, callback) {
    const uid = {
        userid: id
    };
    NewsLetterStore.find(uid, callback);
};

//ALL User NewsLetter
module.exports.getNewsLetters = function (callback) {
    NewsLetterStore.find(callback);
};


// dupliacate User NewsLetter
module.exports.getNewsLetterid = function (id, callback) {
    const Newsletterid = {
        _id: id
    };
    NewsLetterStore.find(Newsletterid, callback);
};


module.exports.viewNewsLetter = function (id, callback) {
    const Newsletterid = {
        _id: id
    };
    NewsLetterStore.find(Newsletterid, callback);
};
