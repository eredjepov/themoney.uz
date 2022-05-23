import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'

import Header from "./components/Header";
import Footer from "./components/Footer";

const SERVER_URL = 'http://0.0.0.0:8080'

ReactDOM.render(
  <ChakraProvider>
    <BrowserRouter>
      <React.StrictMode>
        <Header />
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
                buy: `${SERVER_URL}/rates/buy`,
                sell: `${SERVER_URL}/rates/sell`
              }
              }
            />} />

        </Routes>
        <Footer />
      </React.StrictMode>
    </BrowserRouter>
  </ChakraProvider>,
  document.getElementById('root')
);