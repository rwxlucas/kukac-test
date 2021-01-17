import React, { useState } from 'react'
import axios from 'axios'

import '../loader.css'

function Desafio3() {

    const [selVehicle, setSelVehicle] = useState('')
    const [formSelected, setformSelected] = useState(false)
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
        try {
            setFormSent(true)
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
                setData(req.data.data)
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
                setData(req.data.data)
            }
            clearInput()
        } catch (err) {
            console.log(err)
        }
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
            data ? data.map(item => <li
                style={{
                    margin: '10px',
                    minWidth: '250px',
                    backgroundColor: '#fff',
                    border: '2px solid #ff89a0',
                    borderRadius: '10px',
                    color: '#000',
                    padding: '10px'
                }}
            >
                {item.tipo ? <p>Veículo: {item.tipo.charAt(0).toUpperCase() + item.tipo.slice(1)}</p> : ''}
                {item.modelo ? <p>Modelo: {item.modelo}</p> : ''}
                {item.fabricacao ? <p>Fabricação: {item.fabricacao}</p> : ''}
                {item.portas ? <p>Portas: {item.portas}</p> : ''}
                {item.marca ? <p>Marca: {item.marca}</p> : ''}
                {item.passageiros ? <p>Quantidade de passageiros: {item.passageiros}</p> : ''}
                {item.rodas ? <p>Quantidade de rodas: {item.rodas}</p> : ''}
            </li>) : ''

        )
    }

    const renderMotoForm = () => {
        return <form onSubmit={handleForm} className='d-flex flex-column justify-content-center align-items-start' style={{ width: '300px' }} >
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
            <button type="submit" style={{ backgroundColor: '#ff89a0', color: '#fff' }} className="btn btn-block">Enviar</button>
        </form>
    }
    const renderCarroForm = () => {
        return <form onSubmit={handleForm} className='d-flex flex-column justify-content-center align-items-start' style={{ width: '300px' }}>
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
            <button style={{ backgroundColor: '#ff89a0', color: '#fff' }} type="submit" className="btn btn-block">Enviar</button>
        </form>
    }

    return (
        <div className='container-fluid'>

            <div className="row">
                <h1 className='mt-4 col-md-12 text-center'>
                    Bem vindo ao terceiro desafio!
                </h1>
            </div>

            <div className="row">
                <div className="mt-4 col-md-12 d-flex flex-column align-items-center justify-content-center">
                    <h5>Entre com as informações de seu respectivo veículo:</h5>
                    <label htmlFor="veiculo" style={{ width: '300px' }}>
                        Selecione seu veículo: <select className='form-select' onChange={e => handleSelect(e)} name="veiculo" id="veiculo">
                            <option value=""></option>
                            <option value="carro">Carro</option>
                            <option value="moto">Moto</option>
                        </select>
                    </label>
                    {formSelected ? renderForm() : ''}
                </div>

                {
                    data ? <div
                        className='mt-4 col-md-12 d-flex flex-wrap justify-content-center'
                    >
                        <ul
                            style={{
                                width: '100%',
                                listStyle: 'none'
                            }}
                            className='d-flex flex-wrap flex-row justify-content-center align-items-center'
                        >
                            {renderResult()}
                        </ul>
                    </div> : ''
                }
            </div>
        </div>
    )
}

export default Desafio3