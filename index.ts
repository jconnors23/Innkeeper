import djs from 'discord.js';
import http from 'http'; 
import axios from 'axios'; 
require('dotenv').config();

const client = new djs.Client({
    intents: [djs.Intents.FLAGS.GUILDS, djs.Intents.FLAGS.GUILD_MESSAGES] // what the bot needs, explicit 
})

client.on('ready', () => {   // when bot is ready, listening to user tags 
    console.log(client.user?.tag)
})

// rec msg, filter msg (look for symbols), pull cards from it, if cards, take cards -> scryfall, what scryfall returns, respond to user with that img

client.on('messageCreate', async (message: djs.Message) => {
    const queries = Array.from(message.content.matchAll(/#(.*?)#/gi)).map(match => match[1])  
    //  regex ? = grab locals (lazy), g  = global, i = case insensitive .=anychar .map =  [ 1, 3, 4, ] [ 2, 3, 4,] , 1 grp at a time
    if (queries.length == 0) { return }
    const query = queries[0]; // get the first 
    const response = await axios.get('https://api.scryfall.com/cards/search?q=' + query); 
    const card = response.data.data[0]; // gets the first card
    const cardimage = card.image_uris.border_crop;
    message.reply(cardimage)   
})

client.login(process.env.discord_token) // tell the bot to login 

http.createServer((request, response) => { // make heroku realize app is active
    response.writeHead(200).end()
}).listen(process.env.PORT || 3000)