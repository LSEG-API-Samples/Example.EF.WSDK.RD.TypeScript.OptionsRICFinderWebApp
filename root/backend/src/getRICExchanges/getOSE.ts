export { };
const moment = require('moment');
const checkRIC = require('../helper/checkRIC');
const getExpMonth = require('../helper/getExpMonth');

async function getOseRIC(asset: string, maturity: string, strike: number, optType: string, session: any) {

    let expDate = moment(new Date(maturity)).format('YYYY-MM-DD');
    let assetName = '';
    let strikeRIC = '';

    if (asset[0] == '.') {
        assetName = asset.split('.', 2)[1];
    }
    else {
        assetName = asset.split('.', 2)[0];
    };

    strikeRIC = String(strike).slice(0, 3);
    const expDetails = getExpMonth(expDate, optType);
    let possibleRICs: any = [];
    const generations = ['Y', 'Z', 'A', 'B', 'C'];
    const JNET = ['', 'L', 'R']

    if (asset[0] == '.') {
        if (assetName === 'N225') {
            assetName = 'JNI'
        }
        else if (assetName === 'TOPX') {
            assetName = 'JTI'
        }
        for (let jnet in JNET) {
            const ric = `${assetName}${JNET[jnet]}${strikeRIC}${expDetails[1]}${moment(expDate).format('Y').slice(-1)}.OS`
            const response = await checkRIC(ric, maturity, expDetails[0], session);
            if (Object.keys(response[1]).length !== 0) {
                return response
            }
            else {
                possibleRICs.push(response[0])
            }
        }
    }
    else {
        for (const jnet in JNET) {
            for (let gen in generations) {
                const ric = `${assetName}${JNET[jnet]}${generations[gen]}${strikeRIC}${expDetails[1]}${moment(expDate).format('Y').slice(-1)}.OS`
                const response = await checkRIC(ric, maturity, expDetails[0], session);
                if (Object.keys(response[1]).length !== 0) {
                    return response
                }
                else {
                    possibleRICs.push(response[0])
                };
            }
        }
    };
    console.log(`Here is a list of possible RICs ${possibleRICs}, however we could not find any prices for those!`)
    return possibleRICs
};

module.exports = getOseRIC;