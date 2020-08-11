// FSAC-TSRC

var Discord = require("discord.js"); //Set up the bot
var bot = new Discord.Client();
var moment = require("moment");
var config = require(__dirname + "/config.json");
const fs = require("fs");
//var database = require(__dirname + "/database.json");
var log = (msg) => { // Console timestamp
		console.log(`[FSAC-TSRC ${moment().format("MM-DD-YYYY HH:mm:ss")}] ${msg}`);
	};
	
bot.on('ready', () => {
	var botStatus = {} // Used for setting the bot's status and online/offline state, etc.
	botStatus.status = 'online'
	botStatus.game = {}
	var rng = Math.random();
	if (rng > 0.9) botStatus.game.name = 'Microsoft Train Simulator' // Fun little RNG easter egg thing
	if (rng <= 0.9) botStatus.game.name = 'Trainz Railroad Simulator 12'
	if (rng < 0.7) botStatus.game.name = 'Train Simulator 2017'
	if (rng <= 0.5) botStatus.game.name = 'Microsoft Flight Simulator X'
	if (rng < 0.3) botStatus.game.name = 'Microsoft Flight Simulator 2004'
	if (rng < 0.1) botStatus.game.name = 'Microsoft Flight'
	botStatus.game.type = 1
	bot.user.setPresence(botStatus).catch(log); //Set status and send a message to the console once the bot is ready
	log(`Full steam!`);
	var avlist = [ // List of file paths to avatar
	'/avatar1.png' 
	]
	var avatar = avlist[Math.floor(Math.random() * avlist.length)] // Pick a random avatar
	bot.user.setAvatar(fs.readFileSync(__dirname + avatar), function(err) {
        if (err) throw err;
    });
	log('Current avatar: ' + avatar);
});

bot.on('message', (message) => { //When the bot is on, do this stuff
	//var sCht = require(__dirname + '/channel');
	var doneTheStuff; //vars
	var user 	= message.author;
	var input 	= message.content.toUpperCase();
	var embedColor = 0x0094FF //The color of the side bar for embed messages
	let prefix = "!fsactsrc ";

// help or cmds - Shows commands and info
if ((input == prefix + "HELP") || (input == prefix + "CMDS")) {
	if(message.author.bot) return;
	
	var CMDS = `__**FSAC-TSRC Chat Link**__ by **<@126516587258707969>**
Hi! This is a private bot, so there's no public documentation available. Sorry!`

	message.author.send(CMDS);
	if (message.channel.type != 'dm') {
		message.channel.sendMessage(message.author + ', I sent a copy of the commands in a DM.');
	}
    log("Sent commands to @" + user.username);
}

// invite - Auth URL + Server inv
if (input == prefix + "INVITE") {
	if (message.author.id != 126516587258707969) return;
	message.channel.send(`__**AUTH URL**__
https://discordapp.com/oauth2/authorize?&client_id=286265249026277377&scope=bot&permissions=0`)
	if (message.channel.type === 'text') {
			log(message.guild.name + ': Sent links to @' + message.author.username + ' in #' + message.channel.name)
		} else if (message.channel.type === 'dm') {
			log('Sent links to @' + message.author.username + ' in their DMs')
	}
}

if (message.channel.type == 'dm') return;

// Chat Link				FSAC's Channel								TSRC's Channel
if (message.channel.id == 542432452451368963 || message.channel.id == 380113856313425921) {
	if (message.author.bot) return;
	if (message.content.startsWith(',')) return;
	var embed = new Discord.RichEmbed()
	.setColor(message.member.highestRole.hexColor)
	var attachArray = message.attachments.array(); // Takes the list of attachments and puts them all into an array.
	var attachStr = ""; 
	if (attachArray[0]) { attachStr = attachArray[0].url } else { attachStr = "no"; } // This for all the attachment links (how do you even send more than one image in a single message lmao)
	var msgText = message.content
	if (message.content.length > 1024) msgText = msgText.substring(0,1024) + "..."
	if (attachStr == "no") embed.setDescription(msgText)
	else if (attachStr.endsWith("jpg") || attachStr.endsWith("png") || attachStr.endsWith ("gif")) embed.setImage(attachStr);
	else embed.setDescription(msgText + "\n\n`Attachment:` " + attachStr);
	if (message.channel.id == 380113856313425921) { // From TSRC to FSAC
		embed.setTitle(user.username + ':');
		embed.setFooter("Author User ID: " + user.id + " | Join TSRC: https://discord.me/tsrc")
		bot.channels.find('id', '542432452451368963').send({ embed });
	} else if (message.channel.id == 542432452451368963) { // From FSAC to TSRC
		embed.setTitle(user.username + ':');
		embed.setFooter("Author User ID: " + user.id + " | Join FSAC: https://discord.me/fsac")
		bot.channels.find('id', '380113856313425921').send({ embed });
	}
	//console.log('Having this here is useless because the botlog is logging everything lol')
}

})

bot.login(config.auth);