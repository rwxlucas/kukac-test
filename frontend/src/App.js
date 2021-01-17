import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route } from 'react-router-dom'
import Desafio1 from './components/Desafio1/Desafio1';
import Desafio2 from './components/Desafio2/Desafio2';
import Desafio3 from './components/Desafio3/Desafio3';
import Desafio4 from './components/Desafio4/Desafio4';

function App() {
  return (
    <div>
        <Navbar />

        <div style={{marginLeft: '80px'}}>
          <Route path={'/desafio1'} component={Desafio1} />
          <Route path={'/desafio2'} component={Desafio2} />
          <Route path={'/desafio3'} component={Desafio3} />
          <Route path={'/desafio4'} component={Desafio4} />
        </div>
    </div>
  );
}

export default App;
