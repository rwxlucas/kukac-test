import React from 'react'
import { Link } from 'react-router-dom'

import './Header.css'

const returnLink = () => {
    const challenges = ["Desafio 1","Desafio 2","Desafio 3","Desafio 4",]
    return challenges.map((item, index) => <li key={`desafio${index}`}> <Link className='linkStyle' to={`/${item.toLowerCase().split(' ').join('')}`} >{item}</Link> </li>)
}

function Header() {
    return (
        <div id='headerComp' className="row" style={{borderRadius: '0 0 25px 25px'}}>
            <ul className='d-flex flex-row flex-wrap justify-content-around align-items-center' >
                { returnLink() }
            </ul>
        </div>
    )
}

export default Header
