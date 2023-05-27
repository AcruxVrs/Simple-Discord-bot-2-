const DIscord = require('discord.js');
const config = require("../config.json")

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(`${config.no} You can't use that **${message.author.username}**`)
    if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send(`${config.no} I do not have the \`Kick Members\` permission **${message.author.username}**`)

    let member = message.mentions.members.first();

    const reason = args.slice(1).join(" ")

    if(!member) {
        return message.channel.send(`${config.no} Please tag a user to ban **${message.author.username}**`)
    }

    if(member.id === message.author.id) {
        return message.channel.send(`${config.no} You can't ban yourself **${message.author.username}**`)
    }

    if(member.hasPermission('ADMINISTRATOR')) {
        return message.channel.send(`${config.error} That user is a Mod/Admin **${message.author.username}**`)
    }

    if(member.id === message.guild.ownerID) {
        return message.channel.send(`${config.no} You can't ban the guild owner **${message.author.username}**`)
    }

    member
          .ban({
            reason: reason,
          }).then(() => {
              message.channel.send(`${config.yes} Successfully banned **${member.user.tag}**`)
          }).catch(error => {
              message.channel.send(`${config.error} I was unable to ban that user`)
          })

}

module.exports.config = {
    name: "ban",
    aliases: []
}