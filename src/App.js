import './App.css';
import PageHeader from "./components/PageHeader/PageHeader";
import CourseList from "./components/CourseList/CourseList";
import {useState} from "react";


function App(props) {

    // true - straight direction equal 'bank is buy', false: 'bank is sell'

    const [direction, setDirection] = useState(true)

    const onSetDirection = (direction) => {
        direction === 'buy'? setDirection(true) : setDirection(!true) ;
    }

    return (
        <main className="main-part">
            <PageHeader title={props.title} onSetDirection={onSetDirection}/>
            <CourseList
                title={'Банки покупают'}
                buyUrl={`https://dollaruz.herokuapp.com/rates/buy`}
                sellUrl={`https://dollaruz.herokuapp.com/rates/buy`}
                onSetDirection={onSetDirection}
                direction={direction}/>

            {/*<CourseList title={'Банки Продают'}/>*/}
        </main>
    );
}

export default App;
