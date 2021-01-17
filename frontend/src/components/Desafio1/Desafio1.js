import React, { useState } from 'react'
import axios from 'axios'

function Desafio1() {

    const [responseOk, setResponseOk] = useState(false)
    const [palindrome, setPalindrome] = useState([])

    const handleSubmit = async e => {
        e.preventDefault()
        const { comeco, fim } = e.target
        try {
            const req = await axios.post(
                'http://localhost:8000/palindrome',
                {
                    number: [parseInt(comeco.value), parseInt(fim.value)]
                }
            )
            setResponseOk(true)
            setPalindrome(req.data.message)
            console.log(palindrome)
        } catch (err) {
            console.log(err)
        }
    }

    const renderResult = (responseData) => {
        return responseData.map((item, index) => {
            return <li
                className='d-flex justify-content-center align-items-center'
                style={{
                    padding: '10px',
                    borderRadius: '10px',
                    minWidth: '50px',
                    border: '2px solid #fff',
                    backgroundColor: '#ff89a0',
                    color: '#fff',
                    margin: '5px'
                }}
                key={`palindrome${index}`} > {item} </li>
        })
    }

    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="mt-4 col-md-12 text-center">
                    <h1>Bem vindo ao primeiro desafio!</h1>
                </div>
            </div>

            <div className="row mt-4">
                <h5 className="col-md-12 text-center">
                    Escolha o intervalo para encontrar os números:
                </h5>
            </div>

            <div className='mt-4 row'>
                <div className='col-md-12 d-flex justify-content-center'>
                    <form
                        onSubmit={e => handleSubmit(e)}
                        className='form-group'
                        style={{
                            width: '300px'
                        }}
                    >
                        <label htmlFor="comeco" style={{ width: '100%' }}>
                            Começo do intervalo
                                <input name='comeco' id='comeco' type="text" className='form-control' />
                        </label>
                        <label htmlFor="fim" style={{ width: '100%' }}>
                            Final do intervalo
                                <input name='fim' id='fim' type="text" className='form-control' />
                        </label>
                        <button style={{
                            backgroundColor: '#ff89a0',
                            color: '#fff'
                        }} className='btn btn-block' >Enviar</button>
                    </form>

                </div>
            </div>

            <div className='mt-4 row'>
                <div className='col-md-12 d-flex justify-content-center' >
                    <ul
                        className='d-flex flex-row flex-wrap'
                        style={{
                            listStyle: 'none',
                            width: '90%'
                        }}
                    >
                        {responseOk ? renderResult(palindrome) : ''}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Desafio1
