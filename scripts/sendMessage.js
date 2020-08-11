const guildInvites = require(__dirname + "/../guildInvites.json");

function getInvite(guildID) {
    if (guildInvites[guildID] != undefined) {
        return guildInvited[guildID];
    }
    return null;
}

module.exports = function(message, endChannel) {
    let embed = {};

    // Author
    embed.author = {};
    embed.author.name = message.member.displayName;
    embed.author.icon_url = "https://cdn.discordapp.com/avatars/" + message.author.id + "/"
        + message.author.avatar + ".png";

    // Title
    embed.title = message.guild.name;
    embed.url = getInvite(message.guild.id);
    
    // Color
    embed.color = message.member.highestRole.hexColor;
    
    // Attachments
    let attachments = message.attachments;
    if (attachments.size > 0) {
        let str = "";
        attachments.each(function(attach) {
            str += attach.url + "\n";
        });
        
        embed.fields = [];
        embed.fields[0] = {
            "name":  "Attachments",
            "value": str
        };

        let urlLC = attachments.first().url.toLowerCase(); // this section is really retarded but I cba
        if (urlLC.endsWith("jpg") || urlLC.endsWith("png") || urlLC.endsWith("gif")) {
            embed.image = {};
            embed.image.url = attachments.first().url;
        } else if (urlLC.endsWith("mp4") || urlLC.endsWith("webm") || urlLC.endsWith("wmv")) {
            embed.video = {};
            embed.video.url = attachments.first().url;
        }
    }

    // Embeds
    // This will overwrite the embeds for attached files; this is intended.
    message.embeds.forEach(function(e) {
        switch(e.type) {
        case "image":
            embed.image = {};
            embed.image.url = e.image.url;
            break;
        case "video":
            embed.video = {};
            embed.video.url = e.video.url;
            break;
        default:
            if (e.thumbnail != undefined) {
                embed.image = {};
                embed.image.url = e.thumbnail.url;
            }
        }
    });
    
    // Text
    embed.description = message.content;

    // Footer
    embed.footer = {
        "text": "Author User ID: " + message.author.id
    };
    
    // Finalize & send
    let msgOptions = {
        "embed": embed
    };
    endChannel.send("", msgOptions);
}
