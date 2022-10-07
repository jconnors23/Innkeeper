import djs from 'discord.js';
import axios from 'axios';
require('dotenv').config();

const client = new djs.Client({
    intents: [djs.Intents.FLAGS.GUILDS, djs.Intents.FLAGS.GUILD_MESSAGES] // bot requirements 
})

client.on('ready', () => {   // when bot is ready, listening to user tags 
    console.log(client.user?.tag)
})

export async function FetchCard(query: string): Promise <any> {
    try {
        let response = await axios.get('https://api.scryfall.com/cards/search?q=' + "!" + "\"" + query + "\"") 
        return response.data.data[0];
    } catch (error: any) {
        throw error.response.data.details;
    }
}

client.on('messageCreate', async (message) => {
    try {
        const queries = Array.from(message.content.matchAll(/#(.*?)#/gi))
        /*  regex, looking for '# #' notation which signals user request */
        if (queries.length == 0) { return }
        const query = queries[0][1];  // {ex string: #abc# world [0]: #abc# world , [1]: abc}
        // @ts-ignore
        await message.channel.sendTyping();
        let card: any;
        try {
            card = await FetchCard(query); 
        } catch (error: any) {
            message.reply(error);
            return;
        }
        let fields = Embeds(card); 
        message.reply({ embeds: fields }) // outputing field with card price & image
    } catch (error) {
        console.log(error)
    }
})

export function Embeds(card: any) {
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
    return fields; 
}

if (require.main === module) {
    client.login(process.env.discord_token) 
}