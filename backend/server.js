const express = require('express')
const cors = require('cors')
const app = express()
const routes = require('./routes')

app.use(cors({origin: 'http://localhost:3000'}))

app.use(express.json())

// Challenge 1
app.use('/palindrome', routes.palindrome)
// Challenge 2
app.use('/caixa', routes.caixa)
// Challenge 3
app.use('/veiculos', routes.veiculos)
// Challenge 4
app.use('/cep', routes.cep)

const PORT = 8000
app.listen(PORT, () => console.log(`Server running on ${PORT}...`))