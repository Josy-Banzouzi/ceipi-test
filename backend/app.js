const express = require('express')
const cors = require('cors');
const db = require('./models/index');

const app = express();

app.use(cors());

app.use(express.urlencoded({extended: false}));
app.use(express.json());

db.sequelize.sync({alert: true})
    .then(() => console.log("connexion succefully"))
    .catch((error) => console.log("something get wrong" + error));

require('./routes/userRoute')(app);
require('./routes/historiqueRoute')(app);

module.exports = app;

