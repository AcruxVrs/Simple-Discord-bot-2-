const mongoose = require('mongoose');

const BotloginSchema = new mongoose.Schema({
   Token: {
        type: String
    },
    TokenID: String
});

const MessageModel = module.exports = mongoose.model('botlogin', BotloginSchema);