import {useEffect, useState} from "react";

export default function CourseList(props) {

  const {buyUrl, sellUrl, direction} = props;

    const [data, setData] = useState(null)
    const [url, setUrl] = useState(direction ? buyUrl : sellUrl)


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

    const higherCourseBank = data.reduce((prev, current) => (prev.rate > current.rate) ? prev : current)
    const lowerCourseBank = data.reduce((prev, current) => (prev.rate < current.rate) ? prev : current)

    return (
        <>
            {data &&
            <section className="my-plans">
                <div className="my-plans__wrapper">
                    <h2 className="my-plans__header">{url} /// {props.title}:</h2>
                    <ol className="my-plans__list course-list">

                        {data.sort((a, b) => parseFloat(b.rate) - parseFloat(a.rate)).map((e, id) => {
                            return (
                                <li className="course-list__item" key={e.bankId}>
                                    <p className="course-list__number">{id + 1}.</p>
                                    <p className="course-list__name">{e.name}</p>
                                    <p className="course-list__companions-number"> {higherCourseBank.rate === e.rate ? '🔥' : null}
                                        <b>1 USD > {e.rate} UZS</b></p>
                                    <p className="course-list__link">Обновлено {e.date.replace('T', ' в ').replace('.000Z', '')}</p>
                                </li>
                            )
                        })}

                    </ol>
                </div>
            </section>
            }
        </>
    )
}