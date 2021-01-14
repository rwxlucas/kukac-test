import React from 'react'
import { Route } from 'react-router-dom'
import Desafio1 from '../components/Desafio1'
import Desafio2 from '../components/Desafio2'
import Desafio3 from '../components/Desafio3'
import Desafio4 from '../components/Desafio4'

function Main() {

    return (
        <div>
            <Route exact path='/desafio1' component={Desafio1} />
            <Route exact path='/desafio2' component={Desafio2} />
            <Route exact path='/desafio3' component={Desafio3} />
            <Route exact path='/desafio4' component={Desafio4} />
        </div>
    )
}

export default Main
