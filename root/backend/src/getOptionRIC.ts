const getOPRA = require('./getRICExchanges/getOPRA');
const getHK = require('./getRICExchanges/getHK');
const getOSE = require('./getRICExchanges/getOSE');
const getEUREX = require('./getRICExchanges/getEUREX');
const getIEU = require('./getRICExchanges/getIEU');
const ISINtoRIC = require('./APIRequests/getSymbol');
const getExchangeCode = require('./APIRequests/getExchanges');

async function getOptionRIC(asset: string, maturity: string, strike: number, optType: string, session: any) {
    console.log(asset)
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

    let ric = ''
    if (!asset.includes('.')) {
        ric = await ISINtoRIC(asset)
    }
    else {
        ric = asset
    }
    const exchnageCodes = await getExchangeCode(ric)

    let optionRics = {}
    let pricesList = []
    for (let exch in exchnageCodes.Buckets) {
        let exchange = exchnageCodes.Buckets[exch].Label
        if (exchange in exchanges) {
            const response = await exchanges[exchange](ric, maturity, strike, optType, session)
            if (response[1] && typeof (response[1]) === 'object') {
                optionRics[exchanges_names[exchange]] = (response[0])
                pricesList.push(response[1])
                console.log(`Option RIC for ${exchange} exchange is successfully constructed`)
            }
        }
        else {
            console.log(`The ${exchange} exchange is not supported yet`)
        }
    }
    session.close()
    return [optionRics, pricesList]
}

module.exports = getOptionRIC;
