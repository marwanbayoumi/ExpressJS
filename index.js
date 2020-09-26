const express = require('express');
const path = require('path');
const app = express();
const expshbs = require('express-handlebars');
const PORT = process.env.PORT || 8080;
const members = require('./Members');
const connection = require('./connectToDB');
let arr;

app.engine('handlebars', expshbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
};


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.listen(PORT, () => console.log(`Server started on ${PORT}`));

app.get('/', (req, res) => {

    if (!req.query.inp) {
        res.render('index')
    } else {
        connection.connect();
        let inp = req.query.inp;
        console.log(`Query input given was: ${inp}`);
        let param = `SELECT * FROM nouns AS solution where spanish="${inp}"`;
        connection.query(param, function (err, rows, fields) {
            // if (err || !rows) {
            //     throw err;
            //     res.redirect('index');
            // } else {
            arr = rows[0].english;
            console.log(rows[0].english);
            res.render('index', { arr });
            connection.end();

            // }
        });
    }
});

// app.use(logger);

// app.use(express.static(path.join(__dirname, 'public')));


//member api routes
app.use('/api/members', require('./routes/api/members'));

