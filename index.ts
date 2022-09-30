import djs from 'discord.js';
import axios from 'axios';
require('dotenv').config();

const client = new djs.Client({
    intents: [djs.Intents.FLAGS.GUILDS, djs.Intents.FLAGS.GUILD_MESSAGES] // bot requirements 
})

client.on('ready', () => {   // when bot is ready, listening to user tags 
    console.log(client.user?.tag)
})

client.on('messageCreate', async (message) => {
    try {
        const queries = Array.from(message.content.matchAll(/#(.*?)#/gi))
        /*  regex, looking for '# #' notation which signals user request */
        if (queries.length == 0) { return }
        const query = queries[0][1];  // {ex string: #abc# world [0]: #abc# world , [1]: abc}
        await message.channel.sendTyping();
        let response;
        try {
            response = await axios.get('https://api.scryfall.com/cards/search?q=' + "!" + "\"" + query + "\"") // prefix with ! mark to return specific card 
        } catch (error: any) {
            message.reply(error.response.data.details);
            return;
        }
        const card = response.data.data[0];
        const cardimages = [];
        if (card.image_uris) {
            cardimages.push(card.image_uris.border_crop);
        } else {
            cardimages.push(card.card_faces![0].image_uris!.border_crop, card.card_faces![1].image_uris!.border_crop); // logic for double sided cards
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
                field.value = `[${field.value}](${card.purchase_uris.tcgplayer})` // template literal
                return field
            }))]
        if (cardimages[0]) {
            fields[0].setImage(cardimages[0])
        }
        if (cardimages[1]) {
            fields.push(new djs.MessageEmbed().setImage(cardimages[1]))
        }
        message.reply({ embeds: fields }) // outputing field with card price & image
    } catch (error) {
        console.log(error)
    }
})

client.login(process.env.discord_token) 
