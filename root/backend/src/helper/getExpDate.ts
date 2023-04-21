import { getSession } from '../Common/session';
import { Search } from '@refinitiv-data/data';

const session = getSession();

async function getExpDate(asset: string, openedSession: any = null) {
    const displaySearchResponse = async function (params: Search.Params) {
        const definition = Search.Definition(params);
        const searchRes = await definition.getData(session);
        if (searchRes.data.raw)
            return searchRes.data.raw.Hits[0].ExpiryDate.slice(0, 10)
        else
            console.log('No search result received');
    };

    try {
        if (!openedSession) {
            await session.open();
            console.log('Session open, sending data request');
        };

        return await displaySearchResponse({
            query: asset,
            select: "RIC, ExpiryDate"
        });

    }
    catch (e) {
        console.log(e);
    }
    finally {
        if (!openedSession) { await session.close() }
    };
}

module.exports = getExpDate