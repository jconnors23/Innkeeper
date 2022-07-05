import djs from 'discord.js';
import http from 'http';
import axios from 'axios';
require('dotenv').config();

const client = new djs.Client({
    intents: [djs.Intents.FLAGS.GUILDS, djs.Intents.FLAGS.GUILD_MESSAGES] // bot requirements 
})

client.on('ready', () => {   // when bot is ready, listening to user tags 
    console.log(client.user?.tag)
})

// rec msg, filter msg (look for symbols), pull cards from it, if cards, take cards -> scryfall, respond to user with scryfall img

client.on('messageCreate', async (message) => {
    try {
        const queries = Array.from(message.content.matchAll(/#(.*?)#/gi)).map(match => match[1])
        //  regex ? = grab locals (lazy), g  = global, i = case insensitive .= anychar .map =  [ 1, 3, 4, ] [ 2, 3, 4,] , 1 grp/query at a time
        if (queries.length == 0) { return }
        const query = queries[0]; // get the first request
        //@ts-ignore
        await message.channel.sendTyping(); // ui 
        let response;
        try {
            response = await axios.get('https://api.scryfall.com/cards/search?q=' + "!" + "\"" + query + "\"") // prefix with ! mark to return specific card with name
        } catch (error: any) {
            message.reply(error.response.data.details);
            return;
        }
        const card = response.data.data[0];
        const cardimages = [];
        if (card.image_uris) {
            cardimages.push(card.image_uris.border_crop);
        } else {
            cardimages.push(card.card_faces![0].image_uris!.border_crop, card.card_faces![1].image_uris!.border_crop); // card img arr for double sided cards  
        }
        const fields = [new djs.MessageEmbed().setFields([
            {
                name: '$',
                value: card.prices.usd,
                inline: true
            }, {
                name: '🌟',
                value: card.prices.usd_foil,
                inline: true
            }].filter(field => field.value).map((field) => { // filter null prices   
                field.value = `[${field.value}](${card.purchase_uris.tcgplayer})` // fetch tcg player link 
                return field
            }))]
        if (cardimages[0]) {
            fields[0].setImage(cardimages[0])
        }
        if (cardimages[1]) {
            fields.push(new djs.MessageEmbed().setImage(cardimages[1]))
        }
        message.reply({ embeds: fields })
    } catch (error) {
        console.log(error)
    }
})

client.login(process.env.discord_token) // tell the bot to login 

http.createServer((request, response) => { // make heroku realize app is active
    response.writeHead(200).end()
}).listen(process.env.PORT || 3000)


//  last time S