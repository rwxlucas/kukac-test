import React, { useState } from 'react'

import axios from 'axios'

import '../loader.css'

function Desafio4() {

    const [cep1, setCep1] = useState('')
    const [cep2, setCep2] = useState('')
    const [cep3, setCep3] = useState('')
    const [cep4, setCep4] = useState('')
    const [cep5, setCep5] = useState('')
    const [result, setResult] = useState([])
    const [loading, setLoading] = useState(false)

    const onCep1Change = (value) => {
        setCep1(value)
    }
    const onCep2Change = (value) => {
        setCep2(value)
    }
    const onCep3Change = (value) => {
        setCep3(value)
    }
    const onCep4Change = (value) => {
        setCep4(value)
    }
    const onCep5Change = (value) => {
        setCep5(value)
    }

    const handleForm = async e => {
        e.preventDefault()
        try {
            setResult([])
            setLoading(true)
            if (!cep1 || !cep2 || !cep3 || !cep4 || !cep5) {
                alert('ta faltando cep')
                return
            }
            const cepRequest = [cep1, cep2, cep3, cep4, cep5]
            const reg = new RegExp('^\\d+$');
            for (const item of cepRequest) {
                if (!reg.test(item)) {
                    setLoading(false)
                    alert('Algum CEP está incorreto')
                    return
                }
            }
            const req = await axios.post(
                'http://localhost:8000/cep',
                {
                    cep: cepRequest
                }
            )
            setLoading(false)
            setResult([...req.data.data])
            const cepsList = document.getElementById('cepsList')
            window.scrollTo({
                top: cepsList.offsetTop,
                behavior: 'smooth'
            })
        } catch (err) {
            console.log(err)
        }
    }

    const renderResult = () => {
        return result.map((item, index) => {
            return <li style={{
                margin: '5px',
                padding: '10px',
                borderRadius: '10px',
                width: '280px',
                color: '#000',
                backgroundColor: '#ff89a0'
            }}
                key={`cepItem${index}`}
            >
                {item.bairro ? <p>Bairro: {item.bairro}</p> : ''}
                {item.cep ? <p>CEP: {item.cep}</p> : ''}
                {item.complemento ? <p>Complemento: {item.complemento}</p> : ''}
                {item.gia ? <p>GIA: {item.gia}</p> : ''}
                {item.ibge ? <p>IBGE: {item.ibge}</p> : ''}
                {item.localidade ? <p>Localidade: {item.localidade}</p> : ''}
                {item.logradouro ? <p>Logradouro: {item.logradouro}</p> : ''}
                {item.siafi ? <p>SIAFI: {item.siafi}</p> : ''}
                {item.uf ? <p>UF: {item.uf}</p> : ''}
            </li>
        })
    }

    return (
        <div className='d-flex flex-column justify-content-start align-items-center'>

            <h1 className='mt-4 col-md-12 ml-4 text-center'>
                Bem vindo ao quarto desafio!
            </h1>

            <div className='mt-5 col-md-12 d-flex flex-column align-items-center justify-content-center' style={{ width: '100%' }}>
                <h5>Está precisando de informações de alguns CEP's? Vamos lá!</h5>

                <form onSubmit={handleForm} className='mt-4 d-flex flex-column justify-content-center align-items-start' style={{ width: '300px' }} >
                    <p>Entre com os CEP's:</p>
                    <small className="form-text text-muted">Informe os CEP's sem o hífen.</small>
                    <div className="form-group" style={{ width: '100%' }}>
                        <input required type="text" onChange={e => onCep1Change(e.target.value)} value={cep1} className="form-control" id="cep1" placeholder='Primeiro' />
                    </div>
                    <div className="form-group" style={{ width: '100%' }} >
                        <input required type="text" onChange={e => onCep2Change(e.target.value)} value={cep2} className="form-control" id="cep2" placeholder='Segundo' />
                    </div>
                    <div className="form-group" style={{ width: '100%' }} >
                        <input required type="text" onChange={e => onCep3Change(e.target.value)} value={cep3} className="form-control" id="cep3" placeholder='Terceiro' />
                    </div>
                    <div className="form-group" style={{ width: '100%' }} >
                        <input required type="text" onChange={e => onCep4Change(e.target.value)} value={cep4} className="form-control" id="cep4" placeholder='Quarto' />
                    </div>
                    <div className="form-group" style={{ width: '100%' }} >
                        <input required type="text" onChange={e => onCep5Change(e.target.value)} value={cep5} className="form-control" id="cep5" placeholder='Quinto' />
                    </div>
                    <button style={{ backgroundColor: '#ff89a0', color: '#fff' }} type="submit" className="btn btn-block">Enviar</button>
                </form>
            </div>


            <div id='cepsList' className='col-md-12 mt-4 d-flex flex-wrap justify-content-center'>
                {
                    loading ? <div className="loader"></div> : ''
                }
                <ul style={{ listStyle: 'none' }} className='d-flex flex-row flex-wrap justify-content-center'>
                    {
                        result.length > 0 ? renderResult() : ''
                    }
                </ul>
            </div>

        </div>
    )
}

export default Desafio4
