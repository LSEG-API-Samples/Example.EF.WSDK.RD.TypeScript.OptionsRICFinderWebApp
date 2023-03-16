export { };
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const ExpressError = require('./utils/ExpressError');
const findingRICs = require('./routes/findingRICs');

mongoose.connect('mongodb://127.0.0.1:27017/options'); // 127.0.0.1 or localhost
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();
app.use(bodyParser.json())
app.use(cors())

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))
app.use('/findingRICs', findingRICs)
app.get('/', (req: any, res: any) => {
    res.render('home')
});

app.all('*', (req: any, res: any, next: any) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err: any, req: any, res: any, next: any) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})

app.listen(4000, () => {
    console.log('Serving on port 4000')
})