const Discord = require("discord.js");
const client = new Discord.Client()
const { Client, Attachment } = require('discord.js');
const prefix = "!";
const Enmap = require("enmap");
const fs = require("fs");
const request = require('request');
const config = require("./config.json");
const music = require("./commands/music/music.js");

client.on('ready', () => {
  console.log("Connected as " + client.user.tag)

  client.user.setActivity("videos de Kuno", {type: "WATCHING"})

    console.log("Servers:")
    client.guilds.forEach((guild) => {
        console.log(" - " + guild.name)

        // List all channels
        guild.channels.forEach((channel) => {
            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
        })
    })
})

client.on('ready', () => {
    var generalChannel = client.channels.get("553329315371286565") // Replace with known channel ID
    generalChannel.send("Hola, ya he llegado")  
})

client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'general');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`¡Bienvenido a UwUGaming, ${member}! Espero que lo pases bien OwO`);
});

client.on("message", (message) => {
  // Exit and stop if it's not there
  if (!message.content.startsWith(prefix)) return;
 
  if (message.content.startsWith(prefix + "ip")) {
    message.channel.send("La ip del server es: aeris.ddns.net");
  }
});

client.on('message', message => {
    // If the message is '!rip'
    if (message.content === 'Hola Nikko') {
        message.channel.send(`¡Hola, ${message.author}!`);
    }
});

client.on('message', message => {
    // If the message is '!rip'
    if (message.content === 'hola Nikko') {
        message.channel.send(`¡Hola, ${message.author}!`);
    }
});

client.on('message', message => {
    // If the message is '!rip'
    if (message.content === 'hola nikko') {
        message.channel.send(`¡Hola, ${message.author}!`);
    }
});

client.on('message', message => {
    // If the message is '!rip'
    if (message.content === 'Hola nikko') {
        message.channel.send(`¡Hola, ${message.author}!`);
    }
});

client.on('message', message => {
    // If the message is '!rip'
    if (message.content === 'hola bot') {
        message.channel.send(`¡Hola, ${message.author}!`);
    }
});

client.on('message', message => {
    // If the message is '!rip'
    if (message.content === 'Hola bot') {
        message.channel.send(`¡Hola, ${message.author}!`);
    }
});

client.on('message', message => {
  if (message.content === 'Nikko dame vodka') {
    message.channel.send(`Cyka blyat`);
    }
});

client.on('message', message => {
    if (message.content === 'niño feliz') {
        const attachment = new Attachment('https://imgur.com/iNowMr6.jpg');
        message.channel.send(attachment);
        console.log('Niño muy feliz enviado.')
    }
});

client.on('message', message => {
  if (!message.guild) return;

  if (message.content === '!join') {
    if (message.member.voiceChannel) {
      message.member.voiceChannel.join()
        .then(connection => { 
          message.reply('me he conectado al canal de voz.');
        })
        .catch(console.log);
    } else {
      message.reply('debes unirte a un canal de voz antes de usar este comando.');
    }
  }
});

client.on('message', message => {
  if (message.content === '!leave') { 
    let Canalvoz = message.member.voiceChannel;
    if (!Canalvoz) {
        message.reply('no estas en un canal de voz...');
    } else {
        message.reply('dejando el canal de voz...').then(() => {
        Canalvoz.leave();
        }).catch(error => message.channel.send(error));
    }
}});

client.config = config;

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();
//loading all commands
//loading fun
fs.readdir("./commands/fun/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/fun/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load Fun ${commandName}`);
    client.commands.set(commandName, props);
  });
});
fs.readdir("./commands/yt/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/yt/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load YT ${commandName}`);
    client.commands.set(commandName, props);
  });
});
//loading utility
fs.readdir("./commands/utility/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/utility/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load Utility ${commandName}`);
    client.commands.set(commandName, props);
  });
});
//loading moderation
fs.readdir("./commands/moderation/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/moderation/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load moderation ${commandName}`);
    client.commands.set(commandName, props);
  });
});
//loading bot owner commands aka eval
fs.readdir("./commands/botowner/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/botowner/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load botowner ${commandName}`);
    client.commands.set(commandName, props);
  });
});
//loading 18+ NSFW commands
fs.readdir("./commands/nsfw/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/nsfw/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load nsfw directory ${commandName}`);
    client.commands.set(commandName, props);
  });
});

//loading Misc Module
fs.readdir("./commands/misc/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/misc/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load misc module ${commandName}`);
    client.commands.set(commandName, props);
  });
});

//loading Radio Module
fs.readdir("./commands/radio/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/radio/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load radio module ${commandName}`);
    client.commands.set(commandName, props);
  });
});

client.on('guildMemberRemove', member => {
  let logChannel = member.guild.channels.find('name', 'welcome');
  
    let logEmbed = new Discord.RichEmbed()
    .setAuthor("Alguien ha salido del grupo") 
      .setDescription("Adios " + member.user.username + "..." )
    .setFooter("esperamos volver a verte...", member.user.displayAvatarURL)
    .setColor('RANDOM')
    .setTimestamp()
    logChannel.send(logEmbed);
  })
  
client.login(config.token);