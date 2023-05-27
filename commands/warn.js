const punishments = require("../models/WarnSchema")
const emote = require("../config.json")

module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermission('MANAGE_SERVER')) return message.channel.sens(`You can't use that **${message.author.username}**`)

    let toWarn = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);


    if (toWarn.hasPermission('ADMINISTRATOR')) {
        return message.channel.send(`That user is a Mod/Admin`)
    }

    let data = await punishments.findOne({
        GuildID: message.guild.id,
        UserID: toWarn.id
    });

    let reason = args.slice(1).join(" ")

    if (!reason) {
        return message.channel.send(`Please input a reason **${message.author.username}**`)
    }

    if (!args[0]) {
        return message.channel.send(`Please tag a user to warn **${message.author.username}**`)
    }

    if (toWarn.id === '769330603849285642') {
        return message.channel.send(`I work hard for you and this is how I get repayed **${message.author.username}**`)
    }

    if (toWarn.id === message.guild.ownerID) {
        return message.channel.send(`You can't warn the guild owner **${message.author.username}**`)
    }

    if (toWarn.id === message.author.id) {
        return message.channel.send(`You can't warn yourself **${message.author.username}**`)
    }

    if (data) {
        data.Punishments.unshift({
            PunishType: 'Warn',
            Moderator: message.author.id,
            Reason: reason,
        });
        data.save().then(() => {
            message.channel.send(`Warned **${toWarn.user.tag}** with reason \`${reason}\``)
        })

    } else if (!data) {
        let newData = new punishments({
            GuildID: message.guild.id,
            UserID: toWarn.id,
            Punishments: [{
                PunishType: 'Warn',
                Moderator: message.author.id,
                Reason: reason,
            },],
        });
        newData.save().then(() => {
            message.channel.send(`Warned **${toWarn.user.tag}** with reason \`${reason}\``)
        })

    }
}

module.exports.config = {
    name: "warn",
    aliases: []
}