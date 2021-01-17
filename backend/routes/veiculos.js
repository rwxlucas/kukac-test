"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const route = express_1.Router();
route.post('/', (req, res) => {
    const pathToJson = `${path_1.default.join(__dirname, '../data/veiculos.json')}`;
    const { modelo, fabricacao, portas, marca, rodas, passageiros, selected } = req.body;
    if (selected === 'carro') {
        if (typeof (modelo) !== 'string' || typeof (fabricacao) !== 'number' ||
            typeof (portas) !== 'number' || typeof (marca) !== 'string') {
            return res.send('Incorret request!');
        }
    }
    else if (selected === 'moto') {
        if (typeof (modelo) !== 'string' || typeof (fabricacao) !== 'number' ||
            typeof (fabricacao) !== 'number' || typeof (marca) !== 'string') {
            return res.send('Incorret request!');
        }
    }
    ;
    ;
    ;
    if (selected === 'moto') {
        if (passageiros >= 1 && passageiros <= 2) {
            const moto = {
                tipo: 'moto',
                modelo,
                fabricacao,
                portas: 0,
                marca,
                rodas: 2,
                passageiros
            };
            const jsonFile = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, '../data/veiculos.json'), 'utf-8'));
            for (const data of jsonFile.data) {
                if (data.modelo.toLowerCase() === moto.modelo.toLowerCase()) {
                    return res.send('Moto já cadastrada!');
                }
            }
            jsonFile.data.push(moto);
            fs_1.default.writeFileSync(pathToJson, JSON.stringify(jsonFile));
            const existingData = fs_1.default.readFileSync(path_1.default.join(__dirname, '../data/veiculos.json'), 'utf-8');
            return res.json(JSON.parse(existingData));
        }
    }
    if (selected === 'carro') {
        if (portas >= 2 && portas <= 4) {
            const carro = {
                tipo: 'carro',
                rodas: 4,
                modelo,
                fabricacao,
                portas,
                marca
            };
            const jsonFile = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, '../data/veiculos.json'), 'utf-8'));
            for (const data of jsonFile.data) {
                if (data.modelo.toLowerCase() === carro.modelo.toLowerCase()) {
                    return res.send('Carro já cadastrado!');
                }
            }
            jsonFile.data.push(carro);
            fs_1.default.writeFileSync(pathToJson, JSON.stringify(jsonFile));
            const existingData = fs_1.default.readFileSync(path_1.default.join(__dirname, '../data/veiculos.json'), 'utf-8');
            return res.json(JSON.parse(existingData));
        }
    }
    res.status(400).json({ message: 'Invalid data request!' });
});
module.exports = route;
