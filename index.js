'use strict'
const { DISCORD_CHANNEL_NAME, GUILD, QUESTIONS } = require('./constants')
const { retrieveRolByName } = require('./helpers')
const { Client, MessageEmbed } = require('discord.js')
const client = new Client()

const applying = []

client.on('ready', () => {
    console.log('I am ready!')
})

client.on("message", async message => {

    if (message.author.bot) return

    if (message.content.toString().toLowerCase() === "!comenzar") {
        if (applying.includes(message.author.id)) return

        try {
            console.log(`${message.author.tag} began applying.`)

            applying.push(message.author.id)
            await message.channel.send(":pencil: **Comencemos!** Escribe `!cancelar` si quieres salir.")

            let profile = {
                name: '',
                age: '',
                location: '',
                role: '',
            }

            for (let i = 0, cancel = false; i < QUESTIONS.length && cancel === false; i++) {
                await message.channel.send(QUESTIONS[i])
                await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time: 300000, errors: ['Se acabó el tiempo :-/'] })
                    .then(async collected => {
                        switch (i) {
                            case 0:
                                profile.name = collected.first().content
                                break;
                            case 1:
                                profile.age = collected.first().content
                                break;
                            case 2:
                                profile.location = collected.first().content
                                break;
                            case 3:
                                profile.role = collected.first().content
                                break;
                            default:
                                break;
                        }
                        if (collected.first().content.toLowerCase() === "!cancelar") {
                            await message.channel.send(":x: **Nos vemos en otra ocasión.**")
                            applying.splice(applying.indexOf(message.author.id), 1)
                            cancel = true
                            console.log(`${message.author.tag} cancelled their application.`)
                        }
                    }).catch(async () => {
                        await message.channel.send(":hourglass: **Se acabó el tiempo :-/.**")
                        applying.splice(applying.indexOf(message.author.id), 1)
                        cancel = true
                        console.log(`${message.author.tag} let their application time out.`)
                    })
                    if (cancel) return
            }

            //Add role
            const _role = profile.role.toString().toLowerCase();
            let welcomeMessage = ':thumbsup: **Bienvenid@!**'
            if (_role.replace('á', 'a') === 'master') {
                client.guilds.cache.get(GUILD).members.cache.get(message.author.id).roles.add(retrieveRolByName('MASTER'))
            } else if (_role === 'jugador') {
                client.guilds.cache.get(GUILD).members.cache.get(message.author.id).roles.add(retrieveRolByName('PLAYER'))
            } else {
                client.guilds.cache.get(GUILD).members.cache.get(message.author.id).roles.add(retrieveRolByName('VILLAGER'))
                welcomeMessage = `:thumbsup: **Bienvenid@!**, como no he entendido el rol **${_role}**, te he asignado el de **Aldeano**. Si quieres cambiarlo, habla con **El Tabernero**`
                profile.role = 'Aldeano'
            }

            await message.channel.send(welcomeMessage)
            await message.channel.send('Ahora puedes ir al servidor y saludar a tus nuevos compañer@s de aventuras!')

            const channel = client.channels.cache.find(channel => channel.name === DISCORD_CHANNEL_NAME)

            const embed = new MessageEmbed()
                .setTitle('Nuevo miembro, podéis saludarle 👋')
                .setAuthor(`@${message.author.username}`, message.author.avatarURL())
                .setColor(0x00AE86)
                .addFields(
                    {
                        name: "Su perfil:",
                        value: `* Nombre: ${profile.name}\n * Edad: ${profile.age}\n * Ciudad: ${profile.location}\n * Rol: ${profile.role}\n`,
                        inline: true
                    });

            await channel.send(embed)

            console.log(`${message.author.tag} finished applying.`)
        } catch (err) {
            console.error(err)
        }
    }
})

client.on('guildMemberAdd', async member => {
    console.log(`Welcome triggered by ${JSON.stringify(member)}`)
    const channel = member.guild.channels.cache.find(ch => ch.name === DISCORD_CHANNEL_NAME)
    if (!channel) return
    console.log(`Welcome to the server, ${JSON.stringify(member)}`)
    member.send(`Bienvenido a **La Taberna de Braisgf**, aventurero! Soy Kalius, el observador 👀`)
    member.send(`Contéstame a unas preguntas y te daré a conocer a nuestros miembros!`)
    member.send(`Escribe **!comenzar** cuando estés listo :thumbsup:`)

    //console.log(channel.guild.roles)
})

client.login()
