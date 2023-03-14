export { };
const express = require('express');
const router = express.Router();
const moment = require('moment');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { findRICSchema } = require('../schemas/schemas');
const ricPrices = require('../models/ricPrices');

const getOptionRIC = require('../getOptionRIC');

import { getSession } from '../Common/session';
const session = getSession();

const validateRICRequest = (req: any, res: any, next: any) => {
    const { error } = findRICSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el: { message: any; }) => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.get('/constructRIC', validateRICRequest, async (req: any, res: any) => {
    res.render('findingRICs/constructRIC')
});

router.get('/showRIC', async (req: any, res: any) => {
    const allricPrices = await ricPrices.find({}).sort({ createdDate: -1 });
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(allricPrices));
});

router.post('/constructRIC', catchAsync(async (req: any, res: any) => {
    await session.open()
    let type = ''
    if (req.body.type === 'Call') {
        type = 'C'
    }
    else {
        type = 'P'
    }
    let objects: any = []
    await getOptionRIC(req.body.asset, req.body.maturity, req.body.strike, type, session).then((output: any) => {
        let i = -1
        if (Object.keys(output[0]).length > 0) {
            for (let [key, value] of Object.entries(output[0])) {
                i++
                let vals = {
                    asset: req.body.asset,
                    strike: req.body.strike,
                    maturity: req.body.maturity,
                    ric: value,
                    optionType: req.body.type,
                    exchange: key,
                    prices: output[1][i],
                    createdDate: moment().format()
                }
                let newricPrices = new ricPrices(vals)
                newricPrices.save()
                objects.push(newricPrices)
            }
        }
        else {
            objects = [output[2]]
        }
    })
    res.end(JSON.stringify(objects));
    await session.close();
}))


router.get('/chartWorkspace/:id', catchAsync(async (req: any, res: any) => {
    const result = await ricPrices.findById(req.params.id)
    const pricesValues = JSON.stringify(result.prices);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
}));

router.get('/pricesChart/:id', catchAsync(async (req: any, res: any) => {
    const result = await ricPrices.findById(req.params.id)
    const pricesValues = JSON.stringify(result.prices);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
}));

router.get('/quotesWorkspace/:id', catchAsync(async (req: any, res: any) => {
    const result = await ricPrices.findById(req.params.id)
    const pricesValues = JSON.stringify(result.prices);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
}));


router.delete('/showRIC/:id', catchAsync(async (req: any, res: any) => {
    let ric = await ricPrices.findById(req.params.id)
    await ricPrices.findByIdAndDelete(req.params.id);
    const allricPrices = await ricPrices.find({}).sort({ createdDate: -1 });
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(allricPrices));

}))

module.exports = router;