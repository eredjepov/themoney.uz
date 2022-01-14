import './App.css';
import PageHeader from "./components/PageHeader/PageHeader";
import CourseList from "./components/CourseList/CourseList";
import {useState} from "react";

function App(props) {
    const {urls, currencies} = props;
    // true - straight direction equal 'bank is buy', false: 'bank is sell'

    const [direction, setDirection] = useState('buy')

    const onSetDirection = (e, d) => {
        e.preventDefault();
        d === 'buy' ? setDirection('buy') : setDirection('sell');
    }

    return (
        <main className="main-part">
            <PageHeader title={props.title} direction={direction} onSetDirection={onSetDirection}/>
            <CourseList
                title={'Банки покупают'}
                toCurency={currencies.master.toUpperCase()}
                fromCurency={currencies.slave.toUpperCase()}
                buyUrl={urls.buy}
                sellUrl={urls.sell}
                onSetDirection={onSetDirection}
                direction={direction}/>
        </main>
    );
}

export default App;
