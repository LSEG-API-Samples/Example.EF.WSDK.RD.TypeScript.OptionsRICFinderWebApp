export { };
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ricPricesSchema = new Schema({
    createdDate: Date,
    asset: String,
    strike: Number,
    maturity: String,
    ric: String,
    optionType: String,
    exchange: String,
    prices: Object,
});

module.exports = mongoose.model('ricPrices', ricPricesSchema);