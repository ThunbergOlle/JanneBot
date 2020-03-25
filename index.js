const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
let roles = {
    TE1A: null,
    TE1B: null,
    TE1C: null,
}

client.on('ready', () => {
  console.log(`Loggade in som ${client.user.tag}! 😊`);
  client.guilds.cache.map((guild) => {
    roles.TE1B = guild.roles.cache.find(role => role.name === 'te1b');
    roles.TE1A = guild.roles.cache.find(role => role.name === 'te1a');
    roles.TE1C = guild.roles.cache.find(role => role.name === 'te1c');
  });
  client.user.setActivity('dina betyg..', { type: 'WATCHING' });
});

client.on('message', msg => {
    if(msg.member !== null && msg.member.hasPermission('ADMINISTRATOR') && msg.content.startsWith('+')){
        let args = msg.content.slice(1).split(' ');
        const cmd = args[0];
        args = args.splice(1);

        switch(cmd){
            case 'närvaro':{
                console.log("Kollar närvaro...");
                //manager.check(msg, args[1].toLowerCase());
                if(msg.member.voice.channel) {
                    msg.guild.roles.cache.map(role => {

                        if(role.name.toLowerCase() === args[0].toLowerCase()){
                            const membersLength = role.members.size;
                            let missingMembers = ' ';
                            let totalMembers = 0;
                            role.members.map((member) => {
                                if(member.voice.channel !== null && member.voice.channel.id === msg.member.voice.channel.id){
                                    totalMembers += 1; 
                                }
                                else {  
                                    member.send("Din lektion har nu börjat! Gå in i TEKNIK discorden och gå med i samtalet.");
                                    missingMembers += `, ${member.nickname ? member.nickname : member.user.username}`;
                                }
                            });
                            
                            msg.author.send(`${new Date()}\nNärvaro koll\n\nEj närvarande: ${missingMembers}`);
                            console.log(`Total members ${role.members.size}`);
                            msg.reply(`${totalMembers} av ${membersLength} med i samtalet.`);
                        }
                    });
                }else {
                    msg.reply('Du måste vara i en röstkanal för att skriva detta kommandot. 😌')
                }

            }
            
        }

    }
});

client.login(config.token);    