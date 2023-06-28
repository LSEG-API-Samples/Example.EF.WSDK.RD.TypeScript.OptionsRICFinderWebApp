const getOPRA = require('./getRICExchanges/getOPRA');
const getHK = require('./getRICExchanges/getHK');
const getOSE = require('./getRICExchanges/getOSE');
const getEUREX = require('./getRICExchanges/getEUREX');
const getIEU = require('./getRICExchanges/getIEU');
const ISINtoRIC = require('./APIRequests/getSymbol');
const getExchangeCode = require('./APIRequests/getExchanges');
const getExpiryDate = require('./helper/getExpDate')


async function getOptionRIC(asset: string, maturity: string, strike: number, optType: string, session: any) {
    optType = optType === 'Call' ? "C" : 'P'
    const exchanges = {
        'OPQ': getOPRA,
        'IEU': getIEU,
        'EUX': getEUREX,
        'HKG': getHK,
        'HFE': getHK,
        'OSA': getOSE
    }

    const exchanges_names = {
        'OPQ': 'OPRA',
        'IEU': 'Intercontinetal Exchange',
        'EUX': 'EUREX',
        'HKG': 'Honk Kong Exchange',
        'HFE': 'Hong Kong Exchange',
        'OSA': 'Osaka Exchange'
    }
    let optionRics = {}
    let pricesList = []
    let expDates = []
    let ric = asset

    if (!asset.includes('.')) {
        ric = await ISINtoRIC(asset)
    }
    if (ric.length) {
        const exchnageCodes = await getExchangeCode(ric)
        for (let exch in exchnageCodes.Buckets) {
            let exchange = exchnageCodes.Buckets[exch].Label
            if (exchange in exchanges) {
                const response = await exchanges[exchange](ric, maturity, strike, optType, session)
                if (response[1] && typeof (response[1]) === 'object') {
                    optionRics[exchanges_names[exchange]] = (response[0])
                    if (response[0].includes("^")) {
                        expDates.push(response[1][0]['DATE'])
                    }
                    else {
                        expDates.push(await getExpiryDate(response[0]))
                    }
                    pricesList.push(response[1])
                    console.log(`Option RIC for ${exchange} exchange is successfully constructed`)
                }
            }
            else {
                console.log(`The ${exchange} exchange is not supported yet`)
            }
        }
    }
    return [optionRics, pricesList, expDates]
}

module.exports = getOptionRIC;
