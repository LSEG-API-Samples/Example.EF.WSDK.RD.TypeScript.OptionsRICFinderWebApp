const moment = require('moment');
const getRICWithPrices = require('../helper/getRICWithPrices');
const getExpMonth = require('../helper/getExpMonth');
const getExpComponent = require('../helper/getExpComponent');


function getAssetNameAndStrikeRIC(asset: string, strike: number) {
    let assetName = '';
    let strikeRIC = '';
    if (asset[0] == '.') {
        assetName = asset.split('.', 2)[1];
        strikeRIC = String(Math.floor(strike));
    }
    else {
        assetName = asset.split('.', 2)[0];
        strikeRIC = String(Math.floor(strike * 100));
    };
    return [assetName, strikeRIC]
}

async function getHkRIC(asset: string, maturity: string, strike: number, optType: string, session: any) {
    let expDate = moment(new Date(maturity)).format('YYYY-MM-DD');
    const expDetails = getExpMonth(expDate, optType);
    let [assetName, strikeRIC] = getAssetNameAndStrikeRIC(asset, strike)
    const expComp = getExpComponent(expDate, expDetails[0])
    let ricWithPrices: any = []
    if (asset[0] == '.') {
        const ric = `${assetName}${strikeRIC}${expDetails[1]}${moment(expDate).format('Y').slice(-1)}.HF${expComp}`
        ricWithPrices = await getRICWithPrices(ric, maturity, session);
        if (Object.keys(ricWithPrices[1]).length !== 0) {
            return ricWithPrices
        }
    }
    else {
        for (let i = 0; i <= 3; i++) {
            const ric = `${assetName}${strikeRIC}${String(i)}${expDetails[1]}${moment(expDate).format('Y').slice(-1)}.HK${expComp}`
            ricWithPrices = await getRICWithPrices(ric, maturity, session);
            if (Object.keys(ricWithPrices[1]).length !== 0) {
                return ricWithPrices
            }
        };

    };
    return ricWithPrices
}

module.exports = getHkRIC;
