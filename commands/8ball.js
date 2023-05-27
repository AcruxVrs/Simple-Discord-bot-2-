const Discord = require('discord.js');
const emote = require("../config.json")

module.exports.run = async(client, message, args) => {

  let number = Math.floor(Math.random() * 16)

if (!args[0]) {
    return message.channel.send(`${emote.error} Please input a question **${message.author.username}**`)
}
else {
let responses = ["Yes","No","maybe","Replay hazy","Lmao, of course","My sources say no","Hell yes","Not today","I genuinely don't know","Uh, sure, I guess","Ask again later","No answer","Hell yeah","Don't ask me, I'm just a robot","Ask someone with more knowledge","We shall see"]

const Reply = responses[number]

message.reply(`${emote['8ball']} ${Reply} **${message.author.username}**`)
}
}

module.exports.config = {
    name: "8ball",
    aliases: []
}