export { };
const moment = require('moment');
const getRICWithPrices = require('../helper/getRICWithPrices');
const getExpMonth = require('../helper/getExpMonth');
const getExpComponent = require('../helper/getExpComponent');

function getAssetName(asset: string) {
    let assetName = '';

    if (asset[0] == '.') {
        assetName = asset.split('.', 2)[1];
        if (assetName === 'FTSE') {
            assetName = 'OTUK'
        }
        else if (assetName === 'SSMI') {
            assetName = 'OSMI'
        }
        else if (assetName === 'GDAXI') {
            assetName = 'GDAX'
        }
        else if (assetName === 'ATX') {
            assetName = 'FATXA'
        }
        else if (assetName === 'STOXX50E') {
            assetName = 'STXE'
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

    if (strike % 1 !== 0) {
        intPart = Math.floor(strike);
        decPart = String(strike).split('.', 2)[1][0]
    }
    else {
        intPart = Math.floor(strike)
        decPart = '0'
    }
    if (String(Math.floor(strike)).length === 1) {
        strikeRIC = `0${String(intPart)}${decPart}`
    }
    else {
        strikeRIC = `${String(intPart)}${decPart}`
    }
    return strikeRIC
}


async function getEurexRIC(asset: string, maturity: string, strike: number, optType: string, session: any) {
    let expDate = moment(new Date(maturity)).format('YYYY-MM-DD');
    const expDetails = getExpMonth(expDate, optType);
    const assetName = getAssetName(asset)
    const strikeRIC = getStrikeRIC(strike)
    const expComp = getExpComponent(expDate, expDetails[0])
    const generations = ['', 'a', 'b', 'c', 'd']
    let ricWithPrices: any = []
    for (let gen in generations) {
        const ric = `${assetName}${strikeRIC}${generations[gen]}${expDetails[1]}${moment(expDate).format('Y').slice(-1)}.EX${expComp}`
        ricWithPrices = await getRICWithPrices(ric, maturity, session);
        if (Object.keys(ricWithPrices[1]).length !== 0) {
            return ricWithPrices
        }
    }
    return ricWithPrices
}

module.exports = getEurexRIC;