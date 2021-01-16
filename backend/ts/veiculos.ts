import { Router, Request, Response, json } from 'express';
import fs from 'fs';
import path from 'path'

const route = Router();

route.post('/', (req: Request, res: Response) => {
    const pathToJson = `${path.join(__dirname, '../data/veiculos.json')}`
    const { modelo, fabricacao, portas, marca, rodas, passageiros, selected } = req.body

    console.log(req.body)

    if (selected === 'carro') {
        if (
            typeof (modelo) !== 'string' || typeof (fabricacao) !== 'number' ||
            typeof (portas) !== 'number' || typeof (marca) !== 'string'
        ) {
            return res.send('Incorret request!')
        }
    } else if (selected === 'moto') {
        if (
            typeof (modelo) !== 'string' || typeof (fabricacao) !== 'number' ||
            typeof (fabricacao) !== 'number' || typeof (marca) !== 'string'
        ) {
            return res.send('Incorret request!')
        }
    }

    interface Veiculo {
        modelo: string;
        fabricacao: number;
        portas?: number;
        marca: string;
    };
    interface Carro extends Veiculo {
        portas: 2 | 3 | 4;
    };
    interface Moto extends Veiculo {
        rodas: 2;
        passageiros: 1 | 2;
    };

    if (req.body.selected === 'moto') {
        if (req.body.passageiros >= 1 && req.body.passageiros <= 2) {
            const moto: Moto = {
                modelo: req.body.modelo,
                fabricacao: req.body.fabricacao,
                portas: 0,
                marca: req.body.marca,
                rodas: 2,
                passageiros: req.body.passageiros
            }
            const jsonFile = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/veiculos.json'), 'utf-8'))
            for (const data of jsonFile.data) {
                if (data.modelo.toLowerCase() === moto.modelo.toLowerCase()) {
                    return res.send('Moto já cadastrada!')
                }
            }
            jsonFile.data.push(moto)
            fs.writeFileSync(pathToJson, JSON.stringify(jsonFile))
            return res.json(moto)
        }
    }

    if (req.body.selected === 'carro') {
        if (req.body.portas >= 2 && req.body.portas <= 4) {
            const carro: Carro = {
                modelo: req.body.modelo,
                fabricacao: req.body.fabricacao,
                portas: req.body.portas,
                marca: req.body.marca
            }
            const jsonFile = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/veiculos.json'), 'utf-8'))
            for (const data of jsonFile.data) {
                if (data.modelo.toLowerCase() === carro.modelo.toLowerCase()) {
                    return res.send('Carro já cadastrado!')
                }
            }
            jsonFile.data.push(carro)
            fs.writeFileSync(pathToJson, JSON.stringify(jsonFile))
            return res.json(carro)
        }
    }

    res.status(400).json({ message: 'Invalid data request!' })
})

module.exports = route