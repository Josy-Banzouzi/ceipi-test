const db = require('../models/index');
const {validationResult} = require('express-validator');
const {authPlugins} = require("mysql2");
const {where} = require("sequelize");
const Histori = db.historyque;

exports.findAll = async (req, res) => {
    try{
        const userId = req.id.id;
        console.log(userId);
        Histori.findAll({ where:{ userId: userId }}).then((data) => {
            return res.status(200).json({data: data})
        }).catch(error => res.status(400).json({message: error.message}));
    }catch (e) {
        return res.status(500).json({message: e.message});
    }
}

exports.store = async (req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).jsonp(errors.array());
        }
        const {numberOne, numberTwo, symbol} = req.body;

        const userId = req.id.id;

        let sum = parseInt(await calculate(numberOne, symbol, numberTwo));

        const historique = await Histori.create({numberOne, numberTwo, symbol, sum, userId});

        return res.status(200).json({
            message: "Calcul inseré avec succés",
            data: historique
        })

    }catch (e) {
        return res.status(500).json({message: e.message});
    }
}

exports.delete = async (req, res) => {
    try{
        const { id } = req.params;
        Histori.findByPk(id).then(result => {
            if(!result) return res.status(404).json({message: "Element introuvable"});
            Histori.destroy({where: {id: id}})
                .then(() => {
                    return res.status(200).send({message: "Element supprimé avec succés"});
                })
        }).catch((err) => {
            return res.status(500).send(err);
        });
    }catch (e) {
        return res.status(500).json({message: e.message});
    }
}

async function calculate(numberOne, symbol, numberTwo){
    if (symbol === "+") {
        return numberOne + numberTwo;
    } else if (symbol === "-") {
        return numberOne - numberTwo;
    } else if (symbol === "*") {
        return numberOne * numberTwo;
    } else if(symbol === "/"){
        return numberOne / numberTwo;
    }
}