const superagent = require("snekfetch");
const Discord = require('discord.js')

exports.run = async (client, message, args, level) => {
    superagent.get('https://nekos.life/api/v2/img/meow')
        .end((err, response) => {
      const lewdembed = new Discord.RichEmbed()
      .setTitle("Random cat")
      .setImage(response.body.url)
      .setColor(`#000000`)
      .setFooter(`owo`)
      .setURL(response.body.url);
  message.channel.send(lewdembed);
    })
	
}