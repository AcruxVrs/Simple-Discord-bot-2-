const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  try{
    const msg = bot.snipes.get(message.channel.id)
    const embed = new Discord.MessageEmbed()
    .setAuthor(msg.author, msg.member.user.displayAvatarURL())
    .setDescription(msg.content)
    .setImage(msg.image, true)
    .setFooter('Get Sniped lol')
    .setTimestamp();
    message.channel.send(embed);
    } catch (err){
      message.channel.send("There are no messages to snipe")
    }
}

module.exports.config = {
    name: "snipe",
    aliases: []
}