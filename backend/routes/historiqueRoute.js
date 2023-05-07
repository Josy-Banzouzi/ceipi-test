const {auth} = require("../middlewares/auth");
const controller = require("../controllers/HistoryController");

module.exports = (app) => {
    const express = require('express');
    const router = express.Router();
    const { check } = require('express-validator');
    const auth  = require('../middlewares/auth');
    const controller = require('../controllers/HistoryController');

    router.get('/historiques',  auth, controller.findAll);
    router.post('/historique', auth, controller.store);
    router.delete('/historique/:id', auth, controller.delete);

    app.use('/api', router);
}