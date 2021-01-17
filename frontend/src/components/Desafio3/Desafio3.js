import React, { useState } from 'react'
import axios from 'axios'

import '../loader.css'

function Desafio3() {

    const [selVehicle, setSelVehicle] = useState('')
    const [formSelected, setformSelected] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formSent, setFormSent] = useState(false)
    const [modelo, setModelo] = useState('')
    const [fabricacao, setFabricacao] = useState('')
    const [portas, setPortas] = useState('')
    const [marca, setMarca] = useState('')
    const [passageiros, setPassageiros] = useState('')
    const [data, setData] = useState('')

    const clearInput = () => {
        setModelo('')
        setFabricacao('')
        setPortas('')
        setMarca('')
        setPassageiros('')
    }

    const handleForm = async e => {
        e.preventDefault()
        setFormSent(true)
        setLoading(true)
        if (selVehicle === 'moto') {
            const req = await axios.post(
                'http://localhost:8000/veiculos',
                {
                    modelo,
                    fabricacao: parseInt(fabricacao),
                    marca,
                    passageiros: parseInt(passageiros),
                    selected: selVehicle
                }
            )
            // setData(`${req.data}`)
            console.log(req.data)
            setLoading(false)
        } else if (selVehicle === 'carro') {
            const req = await axios.post(
                'http://localhost:8000/veiculos',
                {
                    modelo,
                    fabricacao: parseInt(fabricacao),
                    portas: parseInt(portas),
                    marca,
                    selected: selVehicle
                }
            )
            // setData(`${req.data.message}`)
            console.log(req.data)
            setLoading(false)
        }
        clearInput()
    }

    const handleSelect = e => {
        setSelVehicle(e.target.value)
        clearInput()
        setformSelected(true)
    }

    const renderForm = () => {
        if (selVehicle === 'moto') {
            return renderMotoForm()
        } else if (selVehicle === 'carro') {
            return renderCarroForm()
        }
    }

    const renderResult = () => {
        return (
            <div className='mt-4 col-md-8 d-flex justify-content-center align-items-center'>
                { loading ? <div className="loader"></div> : ''}
                {
                    data ? <div>{'data'}</div> : ''
                }
            </div>
        )
    }

    const renderMotoForm = () => {
        return <form onSubmit={handleForm} className='d-flex flex-column justify-content-center align-items-start'>
            <div className="form-group" style={{ width: '100%' }}>
                <label htmlFor="modelo">Modelo</label>
                <input required type="text" onChange={e => setModelo(e.target.value)} value={modelo} className="form-control" id="modelo" style={{ width: '100%' }} />
            </div>
            <div className="form-group" style={{ width: '100%' }} >
                <label htmlFor="fabricacao">Ano de fabricação</label>
                <input required type="text" onChange={e => setFabricacao(e.target.value)} value={fabricacao} className="form-control" id="fabricacao" />
            </div>
            <div className="form-group" style={{ width: '100%' }} >
                <label htmlFor="marca">Marca</label>
                <input required type="text" onChange={e => setMarca(e.target.value)} value={marca} className="form-control" id="marca" />
            </div>
            <div className="form-group" style={{ width: '100%' }} >
                <label htmlFor="passageiros">Quantidade de passageiros</label>
                <input required type="text" onChange={e => setPassageiros(e.target.value)} value={passageiros} className="form-control" id="passageiros" />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Enviar</button>
        </form>
    }
    const renderCarroForm = () => {
        return <form onSubmit={handleForm} className='d-flex flex-column justify-content-center align-items-start'>
            <div className="form-group" style={{ width: '100%' }}>
                <label htmlFor="modelo">Modelo</label>
                <input required type="text" onChange={e => setModelo(e.target.value)} value={modelo} className="form-control" id="modelo" style={{ width: '100%' }} />
            </div>
            <div className="form-group" style={{ width: '100%' }} >
                <label htmlFor="fabricacao">Ano de fabricação</label>
                <input required type="text" onChange={e => setFabricacao(e.target.value)} value={fabricacao} className="form-control" id="fabricacao" />
            </div>
            <div className="form-group" style={{ width: '100%' }} >
                <label htmlFor="marca">Marca</label>
                <input required type="text" onChange={e => setMarca(e.target.value)} value={marca} className="form-control" id="marca" />
            </div>
            <div className="form-group" style={{ width: '100%' }} >
                <label htmlFor="portas">Portas</label>
                <input required type="text" onChange={e => setPortas(e.target.value)} value={portas} className="form-control" id="portas" />
            </div>
            <button style={{backgroundColor: '#ff89a0', color: '#fff'}} type="submit" className="btn btn-block">Enviar</button>
        </form>
    }

    return (
        <div className='container-fluid'>

            <h1 className='col-md-12 text-center'>
                Bem vindo ao terceiro desafio!
            </h1>

            <div className='mt-4 col-md-12' >
                <h5>Entre com as informações de seu respectivo veículo:</h5>

                <label className='mt-4' htmlFor="veiculo">
                    Selecione seu veículo: <select className='form-select' onChange={e => handleSelect(e)} name="veiculo" id="veiculo">
                        <option value=""></option>
                        <option value="carro">Carro</option>
                        <option value="moto">Moto</option>
                    </select>
                </label>
            </div>

            <div className='col-md-4 d-flex flex-row justify-content-start align-items-center'>
                {formSelected ? renderForm() : ''}
            </div>
            { formSent ? renderResult() : ''}
        </div>
    )
}

export default Desafio3
