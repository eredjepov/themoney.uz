// import {chakra, useToken} from '@chakra-ui/react'

import React from 'react';
import {useEffect, useState} from "react";
// import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';


export const RateHistory = (props) => {
  const {toCurency, direction, id} = props;
  const [data, setData] = useState(true)


  const url = `https://upd.dollaruz.biz/history/rates/${direction}/${toCurency}/${id}`;

  useEffect(() => {
    fetch(`${url}`)
      .then(d => d.json())
      .then(r => {
        setData(r);
        console.log(r)
      })
      .catch((err) => console.log(err))
  }, [url])

  return (<>
      {data &&
        <>
          {`${toCurency} ${direction}`}
          {/*<ResponsiveContainer width="100%" height="100%">*/}
          {/*  <LineChart*/}
          {/*    width={400}*/}
          {/*    height={400}*/}
          {/*    data={data}*/}
          {/*    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}*/}
          {/*  >*/}
          {/*    <XAxis dataKey="name" />*/}
          {/*    <Tooltip />*/}
          {/*    <CartesianGrid stroke="#f5f5f5" />*/}
          {/*    <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />*/}
          {/*    <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />*/}
          {/*  </LineChart>5555*/}
          {/*</ResponsiveContainer>*/}
        </>
      }
    </>
  )
}
