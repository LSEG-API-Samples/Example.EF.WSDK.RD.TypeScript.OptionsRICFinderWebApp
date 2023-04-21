export { };
const moment = require('moment');
const getRICWithPrices = require('../helper/getRICWithPrices');
const getExpMonth = require('../helper/getExpMonth');
const getExpComponent = require('../helper/getExpComponent');

import { getSession } from '../Common/session';
const session = getSession();
function getAssetName(asset: string) {
    let assetName = '';

    if (asset[0] == '.') {
        assetName = asset.split('.', 2)[1];
        if (assetName === 'FTSE') {
            assetName = 'LFE'
        }
    }
    else {
        assetName = asset.split('.', 2)[0];
    };
    return assetName
}

function getStrikeRIC(strike: number) {
    let intPart = null;
    let decPart = null;
    let strikeRIC = '';

    if (String(Math.floor(strike)).length === 2) {
        strikeRIC = `0${String(Math.floor(strike))}`
    }
    else {
        strikeRIC = `${String(Math.floor(strike))}`
    }
    if (strike % 1 !== 0 && String(Math.floor(strike)).length === 1) {
        intPart = Math.floor(strike);
        decPart = String(strike).split('.', 2)[1][0]
        strikeRIC = `0${String(intPart)}${decPart}`
    }
    return strikeRIC
}

async function getIeuRIC(asset: string, maturity: string, strike: number, optType: string, session: any) {
    await session.open()

    let expDate = moment(new Date(maturity)).format('YYYY-MM-DD');
    const expDetails = getExpMonth(expDate, optType);
    const assetName = getAssetName(asset)
    const strikeRIC = getStrikeRIC(strike)
    const expComp = getExpComponent(expDate, expDetails[0])
    const generations = ['', 'a', 'b', 'c', 'd']
    for (let gen in generations) {
        const ric = `${assetName}${strikeRIC}${generations[gen]}${expDetails[1]}${moment(expDate).format('Y').slice(-1)}.L${expComp}`
        let ricWithPrices = await getRICWithPrices(ric, maturity, session);
        if (Object.keys(ricWithPrices[1]).length > 0) {
            return ricWithPrices
        }
    }
    return []
}
module.exports = getIeuRIC;