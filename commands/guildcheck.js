const Discord = require('discord.js');
const emote = require("../config.json")

module.exports.run = async(bot, message, args) => {
  message.channel.send(`Bualbot in ${bot.guilds.cache.size} guilds and has ${bot.users.cache.size} users.`)
}

module.exports.config = {
    name: "guild",
    aliases: []
}


  
