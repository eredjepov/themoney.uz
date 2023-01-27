import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from './App';
import {ChakraProvider, ColorModeScript} from '@chakra-ui/react'
import theme from './theme'

import Header from "./components/Header";
import Footer from "./components/Footer";

const SERVER_URL = 'https://api.themoney.uz'

ReactDOM.render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <React.StrictMode>
          <Header/>
          <Routes>
            <Route path='/' element={
              <App
                currencies={
                  {
                    master: 'usd',
                    slave: 'uzs'
                  }
                }
                title={['доллар', 'доллара']}
                urls={{
                  buy: `${SERVER_URL}/rates/usd/buy`,
                  sell: `${SERVER_URL}/rates/usd/sell`
                }
                }
              />}
            />

            <Route path='/usd_atm' element={
              <App
                currencies={
                  {
                    master: 'usd_atm',
                    slave: 'uzs'
                  }
                }
                title={['доллар в банкомате', 'доллара в банкомате']}
                urls={{
                  buy: `${SERVER_URL}/rates/usd_atm/buy`,
                  sell: `${SERVER_URL}/rates/usd_atm/sell`
                }
                }
              />}
            />

            <Route path='/rub' element={
              <App
                currencies={
                  {
                    master: 'rub',
                    slave: 'uzs'
                  }
                }
                title={['рубль', 'рубля']}
                urls={{
                  buy: `${SERVER_URL}/rates/rub/buy`,
                  sell: `${SERVER_URL}/rates/rub/sell`
                }
                }
              />}
            />

            <Route path='/eur' element={
              <App
                currencies={
                  {
                    master: 'eur',
                    slave: 'uzs'
                  }
                }
                title={['евро', 'евро']}
                urls={{
                  buy: `${SERVER_URL}/rates/eur/buy`,
                  sell: `${SERVER_URL}/rates/eur/sell`
                }
                }
              />}/>
          </Routes>
          <Footer/>
        </React.StrictMode>
      </BrowserRouter>
    </ChakraProvider>
  </>,
  document.getElementById('root')
);