var config = module.exports = {}

config._app = {
    GUILD: process.env.GUILD,
    DISCORD_CHANNEL_NAME: process.env.DISCORD_CHANNEL_NAME
}

config.mongo = {
    uri: process.env.MONGO_URI,
    db: process.env.MONGO_DB,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD
}