import React, { useState } from 'react'
import axios from 'axios'


function Desafio2() {

    const [pucharse, setPucharse] = useState('')
    const [money, setMoney] = useState('')

    const [result, setResult] = useState(false)
    const [resultData, setResultData] = useState({})

    const handleForm = async e => {
        e.preventDefault()
        try {
            const req = await axios.post(
                'http://localhost:8000/caixa',
                {
                    number: [pucharse, money]
                }
            )

            setResultData({ ...req.data })
            setResult(true)
            setPucharse('')
            setMoney('')
        } catch (err) {
            console.log(err)
        }
    }

    const resultDiv = () => {
        if (resultData.message === 'No money to return') {
            return <div>
                <p>O valor dado está correto, sem troco para você!</p>
            </div>
        } else if (resultData.message === "You don't have money to buy this item.") {
            return <div>
                <p>Infelizmente a quantidade de dinheiro que você dispõe não é suficiente para comprar este item</p>
            </div>
        } else if (resultData.message === 'Invalid credentials!'){
            return <div>
                <p>Você enviou informações não compativeis!</p>
            </div>
        }

        const { cel1, cel10, cel100, pucharse } = resultData.message


        return (
            <div className='col-md-12 d-flex flex-column justify-content-center align-items-center'>
                <div className='mt-4'>
                    <p>Valor da compra: {pucharse}</p>
                    <p>Troco a ser recebido: {cel1 + (cel10 * 10) + (cel100 * 100)}</p>
                    <p>Cédulas de 1: {cel1}</p>
                    <p>Cédulas de 10: {cel10}</p>
                    <p>Cédulas de 100: {cel100}</p>
                </div>
            </div>
        )
    }

    const onPucharseChange = value => {
        setPucharse(value)
    }

    const onMoneyChange = value => {
        setMoney(value)
    }

    return (
        <div className='row' style={{ height: '100%' }}>

            <h1 className='mt-4 col-md-12 ml-4 text-align-center' style={{ backgroundColor: '#fff' }} >
                Bem vindo ao segundo desafio!
            </h1>

            <div className='mt-5 col-md-12 d-flex flex-column align-items-center justify-content-center' style={{ width: '100%' }}>
                <h5>Então você deseja fazer compras? Vamos lá!</h5>

                <form onSubmit={handleForm} className='mt-4 d-flex flex-column justify-content-center align-items-start' style={{ width: '300px' }} >
                    <div className="form-group" style={{ width: '100%' }}>
                        <label htmlFor="pucharse">Valor do item</label>
                        <input required type="text" onChange={e => onPucharseChange(e.target.value)} value={pucharse} className="form-control" id="pucharse" style={{ width: '100%' }} />
                    </div>
                    <div className="form-group" style={{ width: '100%' }} >
                        <label htmlFor="money">Dinheiro entregue</label>
                        <input required type="text" onChange={e => onMoneyChange(e.target.value)} value={money} className="form-control" id="money" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Enviar</button>
                </form>
            </div>


            <div className='col-md-12 mt-4 d-flex justify-content-center align-items-center' style={{ width: '100%' }}>
                {
                    result ? resultDiv() : ''
                }
            </div>
        </div>
    )
}

export default Desafio2
