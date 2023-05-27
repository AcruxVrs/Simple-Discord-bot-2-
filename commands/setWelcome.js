const welcomeSchema = require('../models/welcomeschema')

const cache = new Map()

const loadData = async () => {
  const results = await welcomeSchema.find()

  for (const result of results) {
    cache.set(result._id, result.channelId)
  }
}
loadData()

module.exports.run = async (bot, message) => {
    const { guild, channel } = message

    await welcomeSchema.findOneAndUpdate(
      {
        _id: guild.id,
      },
      {
        _id: guild.id,
        channelId: channel.id,
      },
      {
        upsert: true,
      }
      )

    cache.set(guild.id, channel.id)

    message.reply('Welcome channel set!')
  }


module.exports.getChannelId = (guildId) => {
  return cache.get(guildId)
}


module.exports.config = {
    name: "setwelcome",
    aliases: []
}