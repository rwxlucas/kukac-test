const route = require('express').Router()

route.post('/', (req, res) => {
    if (
        !req.body.number || req.body.number.length > 2 ||
        req.body.number.length === 1 || req.body.number[0] === req.body.number[1]
    ) {
        return res.json({ message: 'Invalid credentials!' })
    }

    const [limit1, limit2] = req.body.number
    const palindrome = []
    if(parseInt(limit1) < parseInt(limit2)){
        for (let i = parseInt(limit1); i <= parseInt(limit2); i++) {
            const reversed = i.toString().split('').reverse().join('')
            if (reversed === i.toString()) {
                palindrome.push(i)
            }
        }
    }else{
        for (let i = parseInt(limit2); i <= parseInt(limit1); i++) {
            const reversed = i.toString().split('').reverse().join('')
            if (reversed === i.toString()) {
                palindrome.push(i)
            }
        }
    }

    return res.json({ message: palindrome })
})

module.exports = route