'use strict'
const { DISCORD_TOKEN, DISCORD_CHANNEL_NAME } = require('./constants')
const Discord = require('discord.js')
const client = new Discord.Client()

const questions = [
    "Cuál es tu nombre?",
    "Cuántos años tienes?",
    "De dónde eres?",
    "Eres máster o jugador?"
]

const applying = []

client.on("message", async message => {

    if (message.author.bot) return

    if (message.content.toLowerCase() === "!comenzar") {
        if (applying.includes(message.author.id)) return

        try {
            console.log(`${message.author.tag} began applying.`)

            applying.push(message.author.id)
            await message.channel.send(":pencil: **Comencemos!** Escribe `!cancelar` si quieres salir.")

            const responses = []

            for (let i = 0, cancel = false; i < questions.length && cancel === false; i++) {
                await message.channel.send(questions[i])
                await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time: 300000, errors: ['Se acabó el tiempo :-/'] })
                    .then(async collected => {
                        responses.push(collected.first().content)
                        if (collected.first().content.toLowerCase() === "#cancel") {
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
            }

            await message.channel.send(":thumbsup: **Bienvenid@!**")
            responses.forEach(async response => {
                const channel = client.channels.cache.find(channel => channel.name === DISCORD_CHANNEL_NAME)
                await channel.send(`${response}\n`)
            });

            console.log(`${message.author.tag} finished applying.`)
        } catch (err) {
            console.error(err)
        }
    }
})

client.on('ready', () => {
    console.log('I am ready!')
})


client.on('guildMemberAdd', async member => {
    console.log(`Welcome triggered by ${JSON.stringify(member)}`)
    const channel = member.guild.channels.cache.find(ch => ch.name === DISCORD_CHANNEL_NAME)
    if (!channel) return
    console.log(`Welcome to the server, ${JSON.stringify(member)}`)
    member.send(`Bienvenido a nuestra taberna, aventurero! Soy Kalius, el observador.\n Contéstame a unas preguntas y te daré a conocer a nuestros miembros!`)
})

client.login(DISCORD_TOKEN)