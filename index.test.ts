import assert from 'assert'
import {FetchCard} from './index'

describe ('fetch', () => {
    it ('retrieve', async () => {
        //assert.deepEqual('Snapcaster Mage', );
        const card = await FetchCard('Snapcaster Mage');
        assert.deepEqual(card.name, 'Snapcaster Mage'); 
    })
})