import React, { useState } from 'react'
import axios from 'axios'

function Desafio1() {

    const [result, setResult] = useState(false)
    const [intervalo1, setIntervalo1] = useState('')
    const [intervalo2, setIntervalo2] = useState('')

    const onIntervalo1Change = (item) => {
        setIntervalo1(item)
    }

    const onIntervalo2Change = (item) => {
        setIntervalo2(item)
    }

    const handleForm = async e => {
        e.preventDefault()
        try {
            const req = await axios.post(
                'http://localhost:8000/palindrome',
                {
                    number: [intervalo1, intervalo2]
                }
            )
            setIntervalo1('')
            setIntervalo2('')
            setResult(req.data.message)
        } catch (err) {
            console.log(err)
        }
    }

    const resultItems = () => {
        return result.map((value, index) => {
            return <li
                key={`result${index}`}
                className="d-flex align-items-center justify-content-center"
                style={{
                    backgroundColor: '#0095f6',
                    width: '50px',
                    height: '50px',
                    borderRadius: '10px',
                    margin: '10px'
                }}
            >
                {value}
            </li>
        })
    }

    return (
        <div className='row mt-4 d-flex flex-column justify-content-start align-items-center'>

            <h1 className='col-md-12 ml-4 text-align-center' style={{ backgroundColor: '#fff' }} >
                Bem vindo ao primeiro desafio!
            </h1>

            <div className='mt-5 col-md-12 d-flex flex-column align-items-center justify-content-center' style={{ width: '100%' }}>
                <h5>Quer descobrir quantos palindromos existem em um intervalo? Sinta-se a vontade</h5>

                <form onSubmit={handleForm} className='mt-4 d-flex flex-column justify-content-center align-items-start' style={{ width: '300px' }} >
                    <div className="form-group" style={{ width: '100%' }}>
                        <label htmlFor="intervalo1">Começo do intervalo</label>
                        <input required type="text" onChange={e => onIntervalo1Change(e.target.value)} value={intervalo1} className="form-control" id="intervalo1" style={{ width: '100%' }} />
                    </div>
                    <div className="form-group" style={{ width: '100%' }} >
                        <label htmlFor="intervalo2">Fim do intervalo</label>
                        <input required type="text" onChange={e => onIntervalo2Change(e.target.value)} value={intervalo2} className="form-control" id="intervalo2" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Enviar</button>
                </form>
            </div>



            <div className='row mt-4 ' style={{ width: '100%' }}>
                <ul style={{ width: '100%', listStyle: 'none', color: '#fff' }} className='col-md-12 d-flex flex-wrap flex-row justify-content-center align-items-center' >
                    {
                        result ? resultItems() : ''
                    }
                </ul>
            </div>
        </div>
    )
}

export default Desafio1
