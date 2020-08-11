module.exports = function(bot) { // as of 2020-08-11, this is largely recycled code
    let gameName;
    var rng = Math.random();
    if (rng > 0.9) gameName  = 'Microsoft Train Simulator' // Fun little RNG easter egg thing
    if (rng <= 0.9) gameName = 'Trainz Railroad Simulator 12'
    if (rng < 0.7) gameName  = 'Train Simulator 2017'
    if (rng <= 0.5) gameName = 'Microsoft Flight Simulator X'
    if (rng < 0.3) gameName  = 'Microsoft Flight Simulator 2004'
    if (rng < 0.1) gameName  = 'Microsoft Flight'
    botStatus.game.type = 1
    bot.user.setPresence({
        status: "online",
        activity: {
            type: "PLAYING",
            name: 
        }
    }).catch(console.log); //Set status and send a message to the console once the bot is ready
        
    var avlist = [ // List of file paths to avatar
        __dirname + "/../avatar1.png"
    ]
    var avatar = avlist[Math.floor(Math.random() * avlist.length)] // Pick a random avatar
    bot.user.setAvatar(fs.readFileSync(__dirname + avatar), function(err) {
        if (err) throw err;
    });
    
    console.log(`Full steam!`);
    log('Current avatar: ' + avatar);
}
