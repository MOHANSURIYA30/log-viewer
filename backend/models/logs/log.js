const mongoose = require('mongoose');

const logSchema  = mongoose.Schema({
    type:{type:String},
    message:{type:String},
    time:{type:String}
});


const LogModel = mongoose.model('test1',logSchema,'test1');
// const LogModel = mongoose.model('logs',logSchema,'logs');

module.exports = LogModel;