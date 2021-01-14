const route = require('express').Router()

route.post('/', (req, res) => {
    if (!req.body.number || req.body.number.length < 2) {
        return res.json({ message: 'Invalid credentials!' })
    }
    let [pucharse, money] = req.body.number
    pucharse = parseInt(pucharse)
    money = parseInt(money)

    const reg = new RegExp('^\\d+$');
    if(reg.test(pucharse) === false || reg.test(money) === false){
        return res.json({message: 'Invalid credentials!'})
    }

    if (pucharse > money) {
        return res.json({ message: `You don't have money to buy this item.` })
    }
    if (pucharse === money) {
        return res.json({ message: `No money to return` })
    }

    let valueToReturn = money - pucharse
    const cel100 = Math.floor(valueToReturn / 100)
    valueToReturn = valueToReturn - (cel100 * 100)
    const cel10 = Math.floor(valueToReturn / 10)
    valueToReturn = valueToReturn - (cel10 * 10)
    const cel1 = Math.floor(valueToReturn / 1)
    valueToReturn = valueToReturn - (cel1 * 1)
    
    res.json({
        message: {
            cel100,
            cel10,
            cel1,
            pucharse
        }
    })
})

module.exports = route