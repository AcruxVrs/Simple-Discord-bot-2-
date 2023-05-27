const Discord = require('discord.js');
const bot = new Discord.Client({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
const config = require('./config.json');
const { loadCommands } = require('./utils/loadCommands');


const mongoose = require('mongoose');

mongoose.connect(process.env.mongoose, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   useFindAndModify: false,
});

require('./utils/loadEvents')(bot);

const { registerFont } = 
  require('canvas');
registerFont('./SyneMono-Regular.ttf', { family: 'SyneMono-Regular' });

const Canvas = require('canvas')
const { MessageAttachment } = require('discord.js')
const path = require('path')
const { getChannelId } = require('./commands/setWelcome')



  const MuteSchema = require('./models/mute-scema')

  const checkMutes = async () => {
    console.log('CHECKING MUTE DATA')

    const now = new Date()

    const conditional = {
      expires: {
        $lt: now,
      },
      current: true,
    }

    const results = await MuteSchema.find(conditional)
    console.log('results:', results)

    if (results && results.length) {
      for (const result of results) {
        const { guildId, userId } = result

        const guild = bot.guilds.cache.get(guildId)
        const member = (await guild.members.fetch()).get(userId)

        const mutedRole = guild.roles.cache.find((role) => {
          return role.name === 'Muted'
        })
        member.roles.remove(mutedRole)
      }

      await MuteSchema.updateMany(conditional, {
        current: false,
      })
    }

    setTimeout(checkMutes, 1000 * 60)
  }
  checkMutes()

  bot.on('guildMemberAdd', async (member) => {
    const { guild, id } = member

    const currentMute = await MuteSchema.findOne({
      userId: id,
      guildId: guild.id,
      current: true,
    })

    if (currentMute) {
      const role = guild.roles.cache.find((role) => {
        return role.name === 'Muted'
      })

      if (role) {
        member.roles.add(role)
      }
    }
  })


bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.snipes = new Discord.Collection();

loadCommands(bot);


bot.login(process.env.token)






const express = require("express")
const app = express()

app.get("/", (req, res) => {
 res.send("hello hell!")
})

app.listen(3000, () => {
 console.log("Whatever you want to put here")
})