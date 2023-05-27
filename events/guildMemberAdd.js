const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js');
const path = require('path');
const { getChannelId } = require('../commands/setWelcome');

module.exports = async (bot, member) => {
  const { guild } = member;

  const channelId = getChannelId(guild.id);
  if (!channelId) {
    return;
  }

  const channel = guild.channels.cache.get(channelId);
  if (!channel) {
    return;
  }

  const canvas = Canvas.createCanvas(700, 250);
  const ctx = canvas.getContext('2d');

  const background = await Canvas.loadImage(
    path.join(__dirname, '../background2.jpg')
  );
  let x = 0;
  let y = 0;
  ctx.drawImage(background, x, y);
  ctx.fillStyle = '#ffffff';
  ctx.font = '35px SyneMono-Regular';
  let text = `Welcome ${member.user.tag}`;
  x = canvas.width / 2 - ctx.measureText(text).width / 2;
  ctx.fillText(text, x, 110 + 100);

  ctx.font = '30px SyneMono-Regular';
  text = `Member #${guild.memberCount}`;
  x = canvas.width / 2 - ctx.measureText(text).width / 2;
  ctx.fillText(text, x, 140 + 100);

  const pfp = await Canvas.loadImage(
    member.user.displayAvatarURL({
      format: 'png',
    })
  );

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

  ctx.drawImage(pfp, 265, 5, 170, 170);

  const attachment = new MessageAttachment(canvas.toBuffer());
  channel.send('', attachment);
};