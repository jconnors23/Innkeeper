import assert from 'assert'
import { MessageEmbed } from 'discord.js'
import {Embeds, FetchCard} from './index'
import sinon from 'sinon'
import axios from 'axios'

describe ('fetch', () => {
    it ('retrieve', async () => {
        const get = sinon.stub(axios, 'get').resolves({data: { data: [{ name: 'Snapcaster Mage' }]}});
        const card = await FetchCard('Snapcaster Mage');
        assert.deepEqual(get.firstCall.args, ['https://api.scryfall.com/cards/search?q=!"Snapcaster Mage"']);
        assert.deepEqual(card.name, 'Snapcaster Mage'); 
    })
})

describe ('embeds', () => {
    it ('one', () => {
        const embed = Embeds({ image_uris: { border_crop: 'abc'}, prices: { } });
        assert.deepEqual(embed, [new MessageEmbed().setImage('abc')]);
    })

    it ('two', () => {
        const embed = Embeds({ card_faces: [{image_uris: { border_crop: 'abc'}}, {image_uris: { border_crop: 'def'}}], prices: { } });
        assert.deepEqual(embed, [new MessageEmbed().setImage('abc'), new MessageEmbed().setImage('def')]);
    })

    it ('one_prices', () => {
        const embed = Embeds({ image_uris: { border_crop: 'abc'}, prices: {usd: 10}, purchase_uris: {tcgplayer: 'abc'} });
        assert.deepEqual(embed, [new MessageEmbed().setImage('abc').setFields({inline: true, name: '$', value:'[10](abc)'})]);
    })
})

afterEach(() => {
    sinon.restore()
})
