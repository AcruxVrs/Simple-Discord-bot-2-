const mongoose = require('mongoose');

let WarnSchema = new mongoose.Schema({
    
    GuildID: String,
    UserID: String,
    Punishments: Array
});

const MessageModel = module.exports = mongoose.model('Warns', WarnSchema);