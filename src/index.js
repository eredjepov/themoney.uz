import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from './App';
import {ChakraProvider} from '@chakra-ui/react'

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const SERVER_URL = 'https://api.dollaruz.biz'

ReactDOM.render(
    <ChakraProvider>
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
                            title={'Курс доллара в Узбекистане'}
                            urls={{
                                buy: `${SERVER_URL}/rates/buy`,
                                sell: `${SERVER_URL}/rates/sell`
                            }
                            }
                        />}/>
                    <Route path='/eur' element={<App currency={'eur'} title={'Курс евро в Узбекистане'}/>}/>
                    <Route path='/rub' element={<App currency={'rub'} title={'Курс рубля в Узбекистане'}/>}/>
                </Routes>
                <Footer/>
            </React.StrictMode>
        </BrowserRouter>
    </ChakraProvider>,
    document.getElementById('root')
);