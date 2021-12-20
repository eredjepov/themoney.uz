import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from './App';
// import reportWebVitals from './reportWebVitals';

import './assets/sass/style.scss'
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

ReactDOM.render(
    <>
        <BrowserRouter>
            <React.StrictMode>
                <Header/>
                <Routes>
                    <Route path='/' element={<App currency={'usd'} title={'Курс доллара в Узбекистане'}/>}/>
                    <Route path='/eur' element={<App currency={'eur'} title={'Курс евро в Узбекистане'}/>}/>
                    <Route path='/rub' element={<App currency={'rub'}  title={'Курс рубля в Узбекистане'}/>}/>
                </Routes>
                <Footer/>
            </React.StrictMode>
        </BrowserRouter>
    </>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
