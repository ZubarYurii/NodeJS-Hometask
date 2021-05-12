const express = require('express')
const cors = require('cors');
require('./config/db');

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./routes');
routes(app);

app.use('/', express.static('./client/build'));


app.use((req, res) => {
    res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message })
})

const port = 3050;

app.listen(port, () => {
    console.log(`Server run on port: ${port}`)
});



exports.app = app;