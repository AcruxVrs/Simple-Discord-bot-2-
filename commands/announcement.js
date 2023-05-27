const Discord = require('discord.js')
const settings = require('/home/runner/bualbot/config.json')

const name = settings.prefix + 'Announce' || settings.prefix + 'announce'
module.exports.run = async (bot, message, args) => {
  let question = message.content.slice(`${name.length}`)

  if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You can't use that **${message.author.username}**`)

  if (!question) {
    message.channel.send('You need to put a annnouncement after command!')
  }


  else {
    message.reply({
      embed: {
        title: `:mega: Announcement :mega:`,
        color: 5301186,
        timestamp: `${message.createdAt}`,
        description: `${question}`,
        footer: {
          icon_url: ``,
          text: `Announced by ${message.author.tag}`
        },
        author: {
          name: `${message.guild.name}`,
          url: "https://discordapp.com",
          icon_url: ``
        }
      }
    }).then(sentMessage => {
      sentMessage.react('<a:announcement:811701980254437446>');
      message.delete().catch(err => console.log(err))
    })
  }










}





module.exports.config = {
  name: "announce",
  aliases: ["Announce"]
}