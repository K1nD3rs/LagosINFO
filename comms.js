const config = require('./config.json'); // Подключаем файл с параметрами и информацией
const Discord = require('discord.js'); // Подключаем библиотеку discord.js
const prefix = config.prefix; // «Вытаскиваем» префикс
const client = new Discord.Client();

// Команды //

function moneta(robot, mess, args) {
  mess.channel.send('Монета подбрасывается...')

	var random = Math.floor(Math.random() * 4) + 1; // Объявление переменной random - она вычисляет случайное число от 1 до 3

	if (random === 1) { // Если вычислено число 1, то выпадает орёл.
    	mess.channel.send(':full_moon: Орёл!')
	} else if (random === 2) { // Если вычислено число 2, то выпадает решка.
   	 mess.channel.send(':new_moon: Решка!')
	} else if (random === 3) { // Если вычислено число 3, то монета падает ребром.
   	 mess.channel.send(':last_quarter_moon: Монета упала ребром!')
	}
}

function clear(robot, mess, args) {
	const arggs = mess.content.split(' ').slice(1); // Все аргументы за именем команды с префиксом
	const amount = arggs.join(' '); // Количество сообщений, которые должны быть удалены
	if (!amount) return mess.channel.send('Вы не указали, сколько сообщений нужно удалить!'); // Проверка, задан ли параметр количества
	if (isNaN(amount)) return mess.channel.send('Это не число!'); // Проверка, является ли числом ввод пользователя 

	if (amount > 100) return mess.channel.send('Вы не можете удалить 100 сообщений за раз'); // Проверка, является ли ввод пользователя числом больше 100
	if (amount < 1) return mess.channel.send('Вы должны ввести число больше чем 1'); // Проверка, является ли ввод пользователя числом меньше 1

	async function delete_messages() { // Объявление асинхронной функции

   	 await mess.channel.messages.fetch({
       	 limit: amount
   	 }).then(messages => {
      	  mess.channel.bulkDelete(messages)
       	 mess.channel.send(`Удалено ${amount} сообщений!`)
   	 })
	};
	delete_messages(); // Вызов асинхронной функции
}

function kick(robot, mess, args) {
    if(!message.member.hasPermission("BAN_MEMBERS"))return(message.reply("Seems that you don't have permission to ban members"))//проверяем разрешения у автора сообщения как участника(в данном случае нужно право банить участников у роли). Если у него нет этого права - бот ответит что "сер, у вас прав нет"
    let toban = message.mentions.members.first()//объявляем того кого будем банить упомянув его
    if(!toban)return(message.reply("please mention a member to ban"))//если не упомянут участник, то бот попросит упомянуть его
    let reason = args.splice(2).join(" ")//нашей причиной будет массив args(он же аргументы), элементы которого соединены пробелом начиная со второго

    const ban_embed = new RichEmbed()//объявляем наш embed, можно и без него, но с ним куда красивее
    .setTitle(`${message.author.tag} banned ${toban.user.tag}`)//ставим ему заголовок с информацией о том кто и кого забанил
    .setDescription(`Reason : ${reason}`)//описанием будет причина
    .setColor("RANDOM")//делаем embed-у рандомный увет
    .setTimestamp()//ставим время, в которое отправили сообщение

    toban.ban(reason)//баним участника с нашей причиной(причина так же отобразаится в аудит-логах)
    message.channel.send(ban_embed)//и отправляем наш эмбед в канал где была использована наша команда
  }	
}


// Список команд //

var comms_list = [{
  name: "moneta",
  out: moneta,
  about: "Орёл или Решка"
}];

var comms_list = [{
  name: "clear",
  out: clear,
  about: "Очистка сообщений"
}];

var comms_list = [{
  name: "kick",
  out: kick,
  about: "Кик"
}];

module.exports.comms = comms_list;