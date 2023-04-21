export { };
const moment = require('moment');
const getRICWithPrices = require('../helper/getRICWithPrices');
const getExpMonth = require('../helper/getExpMonth');
const getExpComponent = require('../helper/getExpComponent');

function getAssetName(asset: string) {
    let assetName = '';
    if (asset[0] == '.') {
        assetName = asset.split('.', 2)[1];
        if (assetName === 'N225') {
            assetName = 'JNI'
        }
        else if (assetName === 'TOPX') {
            assetName = 'JTI'
        }
    }
    else {
        assetName = asset.split('.', 2)[0];
    };
    return assetName
}

function getStrikeRIC(strike: number) {
    let strikeRIC = '';
    strikeRIC = String(strike).slice(0, 3);
    return strikeRIC
}

async function getOseRIC(asset: string, maturity: string, strike: number, optType: string, session: any) {

    let expDate = moment(new Date(maturity)).format('YYYY-MM-DD');
    const expDetails = getExpMonth(expDate, optType);
    const assetName = getAssetName(asset)
    const strikeRIC = getStrikeRIC(strike)
    const expComp = getExpComponent(expDate, expDetails[0])
    const generations = ['Y', 'Z', 'A', 'B', 'C'];
    const JNET = ['', 'L', 'R']
    if (asset[0] == '.') {
        for (let jnet in JNET) {
            const ric = `${assetName}${JNET[jnet]}${strikeRIC}${expDetails[1]}${moment(expDate).format('Y').slice(-1)}.OS${expComp}`
            let ricWithPrices = await getRICWithPrices(ric, maturity, session);
            if (Object.keys(ricWithPrices[1]).length > 0) {
                return ricWithPrices
            }
        }
    }
    else {
        for (const jnet in JNET) {
            for (let gen in generations) {
                const ric = `${assetName}${JNET[jnet]}${generations[gen]}${strikeRIC}${expDetails[1]}${moment(expDate).format('Y').slice(-1)}.OS${expComp}`
                let ricWithPrices = await getRICWithPrices(ric, maturity, session);
                if (Object.keys(ricWithPrices[1]).length > 0) {
                    return ricWithPrices
                }
            }
        }
    };
    return []
};

module.exports = getOseRIC;