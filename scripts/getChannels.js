module.exports = function(bot, id1, id2) {
    return new Promise((resolve, reject) => {
        bot.channels.fetch(id1).then(ch1 => {
            bot.channels.fetch(id2).then(ch2 => {
                return resolve([ch1, ch2]);
            }).catch(err => {
                return reject(err);
            });
        }).catch(err => {
            return reject(err);
        });
    });
}
