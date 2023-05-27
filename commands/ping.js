const Discord = require('discord.js')

module.exports.run = async (bot, message , args) =>{
    message.channel.send('pinging...').then(pong =>{
        const ping = pong.createdTimestamp - message.createdTimestamp
        const apiPing = Math.round(pong)
        pong.edit(`Ping is: \`${ping}ms\`    
Api latency is: \`${bot.ws.ping}ms\``)
    })

}

module.exports.config = {
    name: "ping",
    aliases: ["Ping"]
}
