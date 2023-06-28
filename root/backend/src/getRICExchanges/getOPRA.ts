export { };
const moment = require('moment');
const getRICWithPrices = require('../helper/getRICWithPrices');
const getExpComponent = require('../helper/getExpComponent');


function getExpMonth(optType: string, strike: number, maturity: string, expDate: Date, ident: object) {
    let expMonth = '';

    if (optType.toUpperCase() === 'C') {
        if (strike > 999.999) {
            expMonth = ident[moment(expDate).format('M')].C_bigStrike
        }
        else {
            expMonth = ident[moment(expDate).format('M')].C_smallStrike
        }
    }
    else if (optType.toUpperCase() === 'P') {
        if (strike > 999.999) {
            expMonth = ident[moment(expDate).format('M')].P_bigStrike
        }
        else {
            expMonth = ident[moment(expDate).format('M')].P_smallStrike
        }
    }
    return expMonth
}

function getAssetName(asset: string) {
    let assetName = '';
    if (asset.startsWith('.')) {
        assetName = asset.split('.', 2)[1];
    }
    else {
        assetName = asset.split('.', 2)[0];
    };
    return assetName
}

function getStrikeRIC(strike: number) {
    let intPart = Math.floor(strike);
    let decPart = '00';
    let strikeRIC = '';
    let num_strike = { 1: 'A', 2: 'B', 3: 'C', 4: 'D' }
    if (strike % 1 !== 0) {
        decPart = String(strike).split('.', 2)[1]
    }
    if (decPart.length === 1) {
        decPart = `${decPart}'0'`
    }
    if (intPart < 10) {
        strikeRIC = `00${String(intPart)}${decPart}`
    }
    else if (intPart >= 10 && intPart < 100) {
        strikeRIC = `0${String(intPart)}${decPart}`
    }
    else if (intPart >= 100 && intPart < 1000) {
        strikeRIC = `${String(intPart)}${decPart}`
    }
    else if (intPart >= 1000 && intPart < 10000) {
        strikeRIC = `${String(intPart)}0`
    }
    else if (intPart >= 10000) {
        strikeRIC = `${num_strike[intPart.toString()[0]]}${String(intPart).slice(-4)}`
    }
    return strikeRIC
}

async function getOpraRIC(asset: string, maturity: string, strike: number, optType: string, session: any) {
    let expDate = moment(new Date(maturity)).format('YYYY-MM-DD');
    const ident = {
        '1': { 'exp': 'A', 'C_bigStrike': 'a', 'C_smallStrike': 'A', 'P_bigStrike': 'm', 'P_smallStrike': 'M' },
        '2': { 'exp': 'B', 'C_bigStrike': 'b', 'C_smallStrike': 'B', 'P_bigStrike': 'n', 'P_smallStrike': 'N' },
        '3': { 'exp': 'C', 'C_bigStrike': 'c', 'C_smallStrike': 'C', 'P_bigStrike': 'o', 'P_smallStrike': 'O' },
        '4': { 'exp': 'D', 'C_bigStrike': 'd', 'C_smallStrike': 'D', 'P_bigStrike': 'p', 'P_smallStrike': 'P' },
        '5': { 'exp': 'E', 'C_bigStrike': 'e', 'C_smallStrike': 'E', 'P_bigStrike': 'q', 'P_smallStrike': 'Q' },
        '6': { 'exp': 'F', 'C_bigStrike': 'f', 'C_smallStrike': 'F', 'P_bigStrike': 'r', 'P_smallStrike': 'R' },
        '7': { 'exp': 'G', 'C_bigStrike': 'g', 'C_smallStrike': 'G', 'P_bigStrike': 's', 'P_smallStrike': 'S' },
        '8': { 'exp': 'H', 'C_bigStrike': 'h', 'C_smallStrike': 'H', 'P_bigStrike': 't', 'P_smallStrike': 'T' },
        '9': { 'exp': 'I', 'C_bigStrike': 'i', 'C_smallStrike': 'I', 'P_bigStrike': 'u', 'P_smallStrike': 'U' },
        '10': { 'exp': 'J', 'C_bigStrike': 'j', 'C_smallStrike': 'J', 'P_bigStrike': 'v', 'P_smallStrike': 'V' },
        '11': { 'exp': 'K', 'C_bigStrike': 'k', 'C_smallStrike': 'K', 'P_bigStrike': 'w', 'P_smallStrike': 'W' },
        '12': { 'exp': 'L', 'C_bigStrike': 'l', 'C_smallStrike': 'L', 'P_bigStrike': 'x', 'P_smallStrike': 'X' }
    }
    const expMonth = getExpMonth(optType, strike, maturity, expDate, ident)
    const assetName = getAssetName(asset)
    const strikeRIC = getStrikeRIC(strike)
    const expComp = getExpComponent(expDate, ident)
    const ric = `${assetName}${expMonth}${moment(expDate).format('D')}${moment(expDate).format('Y').slice(-2)}${strikeRIC}.U${expComp}`
    let ricWithPrices = await getRICWithPrices(ric, maturity, session)
    if (Object.keys(ricWithPrices[1]).length > 0) {
        return ricWithPrices
    }
    return []
}

module.exports = getOpraRIC;