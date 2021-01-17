import React from 'react'
import { Link } from 'react-router-dom'

import './Navbar.css'

function Navbar() {
    return (
        <nav 
            className='d-flex justify-content-center align-items-center'
            style={{
                position: 'fixed',
                left: '0',
                backgroundColor: '#fff',
                borderRight: '2px solid #ff89a0',
                height: '100vh',
                width: '80px'
            }}
        >
            <ul 
                className='d-flex flex-column justify-content-around align-items-center'
                style={{
                    height: '90%',
                    width: '100%',
                }}
            >
                <Link 
                    to={'/desafio1'} 
                    style={{textDecoration: 'none'}}
                >
                    <li>Desafio 1</li>
                </Link>
                <Link 
                    to={'/desafio2'} 
                    style={{textDecoration: 'none'}}
                >
                    <li>Desafio 2</li>
                </Link>
                <Link 
                    to={'/desafio3'} 
                    style={{textDecoration: 'none'}}
                >
                    <li>Desafio 3</li>
                </Link>
                <Link 
                    to={'/desafio4'} 
                    style={{textDecoration: 'none'}}
                >
                    <li>Desafio 4</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Navbar
