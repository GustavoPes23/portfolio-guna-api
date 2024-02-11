const config = {};

config.JWT_KEY = process.env.JWT_KEY;
config.MONGO_URL = process.env.MONGO_URL;

//O Saltrounds funciona se receber o valor do .env
config.SALT_ROUNDS = 13;

module.exports = config;