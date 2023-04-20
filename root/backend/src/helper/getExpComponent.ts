export { };
const moment = require('moment');

function getExpComponent(expDate: Date, ident: any) {
    let exp_comp = ''
    if (expDate < moment().format('YYYY-MM-DD')) {
        exp_comp = `^${ident[moment(expDate).format('M')].exp}${moment(expDate).format('Y').slice(-2)}`
    }
    return exp_comp

};

module.exports = getExpComponent;