import assert from 'assert'
import {FetchCard} from './index'

describe ('fetch', () => {
    it ('retrieve', async () => {
        const card = await FetchCard('Snapcaster Mage');
        assert.deepEqual(card.name, 'Snapcaster Mage'); 
    })
})

describe ('fields', () => {
    it ('embeds', async () => {
        const embed = await 
    }
})