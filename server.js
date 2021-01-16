const discord = require("discord.js");
const fs = require("fs");
const bot = new discord.Client();
const { Client } = require('pg');
const moment = require("moment");
const ms = require('parse-ms');

bot.on('ready', () => {
    console.log(`SystemBot was ready. Logged as ${bot.user.tag}.`)
})


bot.on("message", async (message) => {
  if (message.author.bot) return;//Если автор другой бот - нет.
  if (message.channel.type == "dm") return;//Если команда в личку - нет.
  if (message.guild.id != "796452640124305459") return;//Проверяем сервер
  let channelidea = bot.channels.cache.get(`799485232670965780`)
  if(message.channel.id === channelidea.id){
    message.delete();//Удаляем сообщение
    let embed = new discord.MessageEmbed()
    .setTitle(`Идея от ${message.author.tag}`)
    .setDescription(`**Суть идеи: \`${message.content}\`**`)
    .addField(`**Описание смайликов**`, `**👍 - хорошая идея\n\n👎 - плохая идея**`)
    .setThumbnail(message.author.avatarURL({format: 'png', dynamic: true, size: 1024}))
    .setTimestamp();
    channelidea.send("**Внимание! <@799485232670965780> была предложена новая идея, рассмотрите её**", embed).then(async(msg) => {
      await msg.react("👍");
      await msg.react("👎");
    });
  }
});
bot.login("Nzk5NzA0NTg5MDYyMjQyMzM0.YAHc7w.-xYZztR-O9AaIw8lJuEecHkAmiQ")
