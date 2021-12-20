import {Link} from "react-router-dom";

function PageHeader(props) {
    return (
        <>
            <div className="main-part__wrapper">
                <div className="main-part__inner-wrapper">
                    <h1 className="main-part__header">{props.title}</h1>
                    <Link className="main-part__link" to="/">На главную</Link>
                </div>
            </div>

            <section className="filter">
                <div className="filter__by-countries js-filter-body">
                    <div className="filter__wrapper js-filter-wrapper">
                        <h3 className="filter__header">Что смотрим <span className="filter__colon">:</span></h3>
                    </div>
                    <div className="filter__countries-wrapper">
                        <ul className="filter__list mainland-list js-filter-mainland">
                            <li className="mainland-list__item">
                                <a className="mainland-list__link mainland-list__link--selected" href="#" onClick={()=> props.onSetDirection('buy')}>Покупка</a> 👆</li>
                            <li className="mainland-list__item"><a className="mainland-list__link" href="#" onClick={()=>props.onSetDirection('sell')}>Продажа</a> 👇</li>
                        </ul>

                    </div>
                    <button className="button button--gray filter__btn-collapse js-filter-countries-collapse" type="button">Свернуть
                    </button>
                </div>
            </section>

        </>

    );
}

export default PageHeader;
