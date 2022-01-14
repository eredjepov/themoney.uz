import {useEffect, useState} from "react";

export default function CourseList(props) {

    const {buyUrl, sellUrl, direction, title, toCurency, fromCurency} = props;

    const [data, setData] = useState(null)

    const [url, setUrl] = useState(buyUrl)


    useEffect(() => {
        direction === 'buy'
            ? setUrl(buyUrl)
            : setUrl(sellUrl)
    }, [buyUrl, sellUrl, direction])


    useEffect(() => {
        fetch(`${url}`)
            .then(d => d.json())
            .then(r => setData(r))
            .catch((err) => console.log(err))
    }, [url])


    if (!data) {
        return (
            <section className="my-plans">
                <div className="my-plans__wrapper">Жди, я загружаю данные...</div>
            </section>
        )
    }
    if (data.length === 0) {
        return (
            <section className="my-plans">
                <div className="my-plans__wrapper">Что то пошло не так, попробуй лучше позднее...</div>
            </section>
        )
    }

    const topCourseBank = direction === 'buy'
        ? data.reduce((prev, current) => (prev.rate > current.rate) ? prev : current)
        : data.reduce((prev, current) => (prev.rate < current.rate) ? prev : current)

    return (
        <>
            {data &&
            <section className="my-plans">
                <div className="my-plans__wrapper">
                    <h2 className="my-plans__header">
                        {
                            direction === 'buy'
                                ? 'Ты можешь продать по такому курсу'
                                : 'Ты можешь купить по такому курсу'
                        }
                    </h2>
                    <ol className="my-plans__list course-list">

                        {data.sort((a, b) =>
                            (
                                direction === 'buy'
                                    ? parseFloat(b.rate) - parseFloat(a.rate)
                                    : parseFloat(a.rate) - parseFloat(b.rate)
                            )).map((e, id) => (
                                <li className="course-list__item" key={e.bankId}>
                                    <p className="course-list__number">{id + 1}.</p>
                                    <p className="course-list__name">{e.name}</p>
                                    <p className="course-list__companions-number">
                                        {topCourseBank
                                            .rate === e.rate ? '🔥' : null}

                                        <b>{
                                            direction === 'buy'
                                                ? `1 ${toCurency} > ${e.rate} ${fromCurency}`
                                                : `${e.rate} ${fromCurency} >  1 ${toCurency}`
                                        }</b>
                                    </p>
                                    <p className="course-list__link">Обновлено {e.date
                                        .replace('T', ' в ')
                                        .replace('.000Z', '')
                                        // .split(' ')
                                        // .map((item, index) => index === 2
                                        //     ? item
                                        //         .split(':')
                                        //         .map((el, id) => id !== 0
                                        //             ? el
                                        //             : +el + 2 > 23
                                        //                 ? +el + 2 - 24
                                        //                 : +el + 2)
                                        //         .join(':')
                                        //     : item)
                                        // .join(' ')
                                    }
                                    </p>
                                </li>
                            )
                        )}

                    </ol>
                </div>
            </section>
            }
        </>
    )

}