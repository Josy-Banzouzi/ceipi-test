const Db = require('../models/index.js');
const {validationResult} = require('express-validator');
const {response} = require("express");
const bcrypt = require('bcrypt');
const User = Db.User;
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try{
        // verify if with have none validate attribute
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).jsonp(errors.array());
        }

        const {name, email, password} = req.body;

        // verify if we have an existing email
        let user = await User.findOne({where: {email: email}});
        if(user){
            return res.status(409).json({message: "Un utilisateur avec cet email existe deja"})
        }

        const passwordHash = bcrypt.hashSync(password, 12);

        user = User.create({name, email, password: passwordHash });

        return res.status(201).json({
            message: "Compte cree avec succes",
            user: user
        })
    }catch (e) {
       return res.status(500).json({message: e.message});
    }
}


exports.login = async (req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).jsonp(errors.array());
        }

        const {email, password} = req.body;

        // get user by email
        let user = await User.findOne({where: {email: email}});

        if(!user || !bcrypt.compareSync(password, user.password)){
            return res.status(404).json({message: "Email ou mot de passe incorrect"});
        }

        // create token

        const token = jwt.sign({
            id: user.id,
        },"CEIPI-TEST");

        return res.status(200).json({
            message: "Connecté avec succés",
            token: token,
            user: user
        });

    }catch (e) {
        return res.status(500).json({message: e.message});
    }
}