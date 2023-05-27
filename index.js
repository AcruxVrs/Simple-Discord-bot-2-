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
});

require('./utils/loadEvents')(bot);

const { registerFont } = 
  require('canvas');
registerFont('./SyneMono-Regular.ttf', { family: 'SyneMono-Regular' });

const Canvas = require('canvas')
const { MessageAttachment } = require('discord.js')
const path = require('path')
const { getChannelId } = require('./commands/setWelcome')

bot.on('guildMemberAdd', async (member) => {
    const { guild } = member

    const channelId = getChannelId(guild.id)
    if (!channelId) {
      return
    }

    const channel = guild.channels.cache.get(channelId)
    if (!channel) {
      return
    }

    const canvas = Canvas.createCanvas(700, 250)
    const ctx = canvas.getContext('2d')

    const background = await Canvas.loadImage(
      path.join(__dirname, './background2.jpg')
    )
    let x = 0
    let y = 0
    ctx.drawImage(background, x, y)
    ctx.fillStyle = '#ffffff'
    ctx.font = '35px SyneMono-Regular'
    let text = `Welcome ${member.user.tag}`
    x = canvas.width / 2 - ctx.measureText(text).width / 2
    ctx.fillText(text, x, 110 + 100)

    ctx.font = '30px SyneMono-Regular'
    text = `Member #${guild.memberCount}`
    x = canvas.width / 2 - ctx.measureText(text).width / 2
    ctx.fillText(text, x, 140 + 100)
    
    
    
   const pfp = await Canvas.loadImage(
      member.user.displayAvatarURL({
        format: 'png',
      })
    )

     ctx.beginPath(); 
    var X = canvas.width / 2;
    var Y = canvas.height / 2.8;
    var R = 45;
    ctx.beginPath();
    ctx.arc(X, Y, 80, 0, 2 * Math.PI, true);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#FF0000';
    ctx.stroke();
    
    ctx.closePath();
    ctx.clip();
    
    
    ctx.drawImage(pfp, 265, 5, 170, 170)
    

    console.log(X, Y)



    const attachment = new MessageAttachment(canvas.toBuffer())
    channel.send('', attachment)
  })

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

require('./utils/loadEvents')(bot);




const express = require("express")
const app = express()

app.get("/", (req, res) => {
 res.send("hello hell!")
})

app.listen(3000, () => {
 console.log("Whatever you want to put here")
})