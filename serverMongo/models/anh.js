var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var anhSchema = new Schema({
    sohuu: {type: String, index: true},
    dsAnh: [
        {
            maanh: String
        }
    ]
});

module.exports = mongoose.model('Anh', anhSchema);