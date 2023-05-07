module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const { check } = require('express-validator');
    const controller = require('../controllers/UserController');

    router.post('/register',
        controller.register
    )

    router.post('/login', controller.login);

    app.use('/api', router);
}
