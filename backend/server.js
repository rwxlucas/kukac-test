const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors({origin: 'http://localhost:3000'}))

app.use(express.json())

// Challenge 1
app.use('/palindrome', require('./routes').palindrome)
// Challenge 2
app.use('/caixa', require('./routes').caixa)
// Challenge 3

// Challenge 4
app.use('/cep', require('./routes').cep)

const PORT = 8000
app.listen(PORT, () => console.log(`Server running on ${PORT}...`))