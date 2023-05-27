const Discord = require('discord.js')


module.exports.run = async (bot, message, args) => {
  
    let userArray = message.content.split(" ");
    let userArgs = userArray.slice(1);
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);
    let reason = args.slice(1).join(" ")


    if(member.id === message.author.id) { 
        return message.channel.send(`**${member.user.username}** you can\`t hug yourself`)
}

     else if(member){  
        let responses = ["https://images-ext-2.discordapp.net/external/W24dpvbkVkJh9wwcQVeq8hMKo2To0WH0z0Rqh7isv7Y/https/cdn.weeb.sh/images/BkZngAYtb.gif","https://cdn.weeb.sh/images/Sk-xxs3C-.gif","https://images-ext-2.discordapp.net/external/E_evPC3tRlb58FW4rhDn2vFduMN-8UB_8Z86FwCSJQs/https/cdn.weeb.sh/images/HytoudXwW.gif?width=400&height=266","https://images-ext-1.discordapp.net/external/ZKj1gPEihmcREvx9zYPoVjBCAKr4iSJ6CbSXC60VnlM/https/cdn.weeb.sh/images/Hyec_OmDW.gif?width=400&height=225","https://images-ext-2.discordapp.net/external/Dx397c2dz7xdLRhVk__fGiTVEo7fbIQ0brfhkMORVgU/https/cdn.weeb.sh/images/ryjJFdmvb.gif?width=400&height=225"]
        
        let response = Math.floor(Math.random() * responses.length)
        const embedReply = responses[response]
        message.reply({
            embed: {
                title: `**${member.user.username}** got a hug from ${message.author.username}`,
                color: 5301186,
                timestamp: `${message.createdAt}`,
                image: {
                    url: `${embedReply}`,
                footer: {
                  icon_url: `${message.author.displayAvatarURL()}`,
                  text: `${message.author.tag}`},
    
                }
            }
                })
            }
            
        }
                  
                
              

        
                       
      






module.exports.config = {
    name: "hug",
    aliases: ["Hug"]
}