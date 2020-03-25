const Discord = require('discord.js');
const client = new Discord.Client();

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
    
    if(msg.member.hasPermission('ADMINISTRATOR') && msg.content.startsWith('+')){
        const cmd = String(msg.content).substr(1, msg.content.length);
        const args = msg.content.slice(1).split(' ');

        console.log(cmd);
        switch(args[0]){
            case 'närvaro':{
                console.log("Kollar närvaro...");
                //manager.check(msg, args[1].toLowerCase());
                if(msg.member.voice.channel) {
                    msg.guild.roles.cache.map(role => {

                        if(role.name === args[1].toLowerCase()){

                            let totalMembers = 0;
                            role.members.map((member) => {
                                if(member.voice.channel !== null && member.voice.channel.id === msg.member.voice.channel.id){
                                    totalMembers += 1; 
                                }
                                else {
                                    msg.channel.send(`<@${member.user.id}> gå med i samtalet! Lektionen har börjat`);
                                }
                            });
                            const membersLength = role.members.size;
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

client.login('NjkyMDM5ODE4ODY3Mzc2MjA1.XnuDuw.CTpSaXVdkaGgtZcn0hS7JqaX1jo');    