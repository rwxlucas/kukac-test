const route = require('express').Router()
const axios = require('axios')

route.post('/', async (req, res) => {
    
    if (!req.body.cep || req.body.cep.length < 5 || req.body.cep.length > 5) {
        return res.json({ message: 'Invalid request!' })
    }
    
    const reg = new RegExp('^\\d+$');
    // const reg = new RegExp('^\d{5}-\d{3}$');
    for (const i of req.body.cep) {
        if (i.toString().length !== 8) {
            return res.json({ message: 'Invalid CEP.' })
        }
        if(!reg.test(i)){
            return res.json({ message: 'Invalid CEP.' })
        }
    }

    const cepInfos = []

    for (const cep of req.body.cep) {
        try {
            const cepInfo = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            cepInfos.push((cepInfo.data))
        } catch (err) {
            return res.json({ message: err })
        }
    }


    res.json({data: cepInfos})
})

module.exports = route