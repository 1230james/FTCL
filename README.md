# FTCL - FSAC/TSRC Chat Link

A simple bot that links two specific Discord servers' channels, and relays messages posted in either one to the other channel, creating an inter-server chat channel.

## Usage

If you fork this bot for your own use, here's how to use it.

This bot requires **discord.js v12**. Newer major versions may or may not work (but they don't exist at the time of writing, so who knows).

Assuming you already have the correct version of discord.js installed and the repository cloned:

1. Create new files `config.json` and `guildInvites.json`, then place them in the root of the repository; i.e. you should be able to get this result in Unix:

```
$ ls
avatar1.png  botscript.js  channelConfig.json  config.json  guildInvites.json  LICENSE  README.md  scripts
```

2. `config.json` should look like this:

```JSON
{
    "auth": ""
}
```

Set the value of `auth` to your Discord bot's token.

3. `guildInvites.json` should look like this:

```JSON
{
    "guildID1": "https://discord.gg/ABCD123",
    "guildID2": "https://discord.gg/efgh456"
}
```

Essentially: key-value table where the keys are guild (server) IDs as strings and the values are server invites to the corresponding guild. This bot does NOT check if the invites are still valid; that is up to you as the user to keep track of and maintain.

4. Set up `channelConfig.json`. It works like this:

```JSON
[
    [
        "channelID1",
        "channelID2"
    ],
    [
        "channelID3",
        "channelID4"
    ]
]
```

`channelConfig.json` is one big array containing arrays inside of it ("subarrays"). Each subarray contains only two elements: channel IDs, in string form, to read and write from. The bot will forward all messages sent in either channel to the other one.

For example, if `channelID1` is the ID for `channel1`, and `channelID2` is the ID for `channel2`, then with the example contents for `channelConfig.json` above, any time I send a message in `channel1`, it will be relayed to `channel2`. Any time I send a message in `channel2`, it will be relayed to `channel1`. This way, each pair of channel IDs are linked. You only need to supply the pairs of channel IDs; the bot will handle the rest for you.

**Please make sure all your config files are properly set up when running the bot.** This bot is **NOT** designed to catch all possible errors, and if something goes wrong, consider yourself lucky if the bot doesn't completely crash.

5. On Discord, ensure your bot has permissions to **Read and Send messages** *and* **Embed Links** in all channels that are being linked.

6. (Optional) Change `avatar1.png` to something else. Not required to get the bot to run, but you probably want something other than a cropped no-anti-alias screenshot of a steam locomotive in my train simulator.

7. (Optional) Update the contents of `scripts/onReady.js`, or comment out the body of the function. This function is called once the bot successfully logs in to Discord, but the contents of this script are largely specific to my bot, FTCL. You'll probably want to replace the game names and stuff with something more relevant to you, or just remove it entirely. **Just don't delete the file** unless you also remove the references to `onReady.js` in `botscript.js`.

8. To launch the bot, just execute `botscript.js`.