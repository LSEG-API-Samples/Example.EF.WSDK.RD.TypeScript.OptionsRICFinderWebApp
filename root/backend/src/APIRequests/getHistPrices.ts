
import { HistoricalPricing } from '@refinitiv-data/data';
import { getSession } from '../Common/session';

const session = getSession();

async function getPrices(asset: string, sDate: string, eDate: string, openedSession: any = null, fields: any = ['TRDPRC_1', 'BID', 'ASK']) {
    try {
        if (!openedSession) {
            await session.open();
            console.log('Session open, sending data request');
        };

        const request = HistoricalPricing.Summaries.Definition({
            universe: asset,
            interval: HistoricalPricing.Summaries.InterdayInterval.DAILY,
            fields: fields,
            start: sDate,
            end: eDate
        });
        const historicalPrices = await request.getData(openedSession || session);
        return historicalPrices.data.table;
    }
    catch (e) {
        console.log(e);
    }
    finally {
        if (!openedSession) { await session.close() }
    };
};

module.exports = getPrices;

