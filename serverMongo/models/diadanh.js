var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var diadanhSchema = new Schema({
    madiadanh: {type: String, index: true},
    tendiadanh: String,
    dsAnh: [
        {
            maanh: String,
            url: String,
            sohuu: String
        }
    ]
});

module.exports = mongoose.model('DiaDanh', diadanhSchema);