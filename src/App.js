import './App.css';

import CourseList from "./components/CourseList/CourseList";
import {useState} from "react";

import * as React from 'react';

function App(props) {
    const {urls, currencies} = props;

    const [direction, setDirection] = useState('buy')

    const onSetDirection = (e, d) => {
        e.preventDefault();
        d === 'buy' ? setDirection('buy') : setDirection('sell');
    }

    return (
        <>
            <main className="main-part">
                <CourseList
                    title={'Банки покупают'}
                    toCurency={currencies.master.toUpperCase()}
                    fromCurency={currencies.slave.toUpperCase()}
                    buyUrl={urls.buy}
                    sellUrl={urls.sell}
                    onSetDirection={onSetDirection}
                    direction={direction}/>
            </main>
        </>
    );
}

export default App;
