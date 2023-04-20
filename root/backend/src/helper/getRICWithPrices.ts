export { };
const moment = require('moment');
const getPrices = require('../APIRequests/getHistPrices');


async function getRICWithPrices(ric: string, maturity: string, session: any) {
    let expDate = moment(new Date(maturity)).format('YYYY-MM-DD');;
    let sDate = moment().subtract(90, 'days').format('YYYY-MM-DD')
    let eDate = moment().format('YYYY-MM-DD');
    if (expDate < moment().format('YYYY-MM-DD')) {
        sDate = moment(expDate).subtract(90, 'days').format('YYYY-MM-DD')
        eDate = moment(expDate).format('YYYY-MM-DD')
    }
    let prices = {};

    if (ric.split('.')[1].charAt(0) === 'U') {
        prices = await getPrices(ric, sDate, eDate, session);
    }
    else {
        const fields = ['BID', 'ASK', 'TRDPRC_1', 'SETTLE']
        prices = await getPrices(ric, sDate, eDate, session, fields);
    }
    return [ric, prices]

};

module.exports = getRICWithPrices;