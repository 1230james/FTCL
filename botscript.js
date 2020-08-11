// FTCL by James "1230james" Hyun
"use strict";

// Libraries & Important Vars
const botConfig  = require("./config.json");
const chnlConfig = require("./channelConfig.json");

const Discord = require("discord.js");
const bot     = new Discord.Client();

var channels  = {};

const getChannels = require("./scripts/getChannels.js");
const sendMessage = require("./scripts/sendMessage.js");

// =====================================================================================================================

// Run when msg received
bot.on("message", function(message) {
    // Author check
    if (message.author.bot) return;

    // Process
    if (channels[message.channel.id] != undefined) {
        sendMessage(message, channels[message.channel.id]);
    }
});

// Initialize all channels
function initAllChannels() {
    chnlConfig.forEach(function(arr) {
        getChannels(bot, arr[0], arr[1]).then(chnls => {
            channels[arr[0]] = chnls[1];
            channels[arr[1]] = chnls[0];
        }).catch(err => {
            console.log(err);
        });
    });
}

// =====================================================================================================================

// Initialization
bot.login(config.auth);
initAllChannels();
