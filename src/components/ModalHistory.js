import * as React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
// import {RateHistory} from "./RateHistory";
import {AreaChart, Area, CartesianGrid, Tooltip, XAxis, YAxis} from 'recharts';

import {useEffect, useState} from "react";


export default function ModalHistory({content, title, openTxt, toCurrency, direction, id}) {

  const url = `https://upd.dollaruz.biz/history/rates/${direction}/${toCurrency}/${id}`;

  const [data, setData] = useState(true);

  useEffect(() => {
    fetch(`${url}`)
      .then(d => d.json())
      .then(r => {
        const newData = r.map((item) => {
          return {rate: item.rate, date: item.date.substring(0, 10)}
        })
        setData(newData);
      })
      .catch((err) => console.log(err))
  }, [url])

  const styles = {
    fontFamily: "sans-serif",
    textAlign: "center",
    paddingTop: "30px"
  };

  const {isOpen, onOpen, onClose} = useDisclosure()
  return (
    <>
      <Link onClick={() => {
        onOpen()
      }} color={'gray.400'} fontSize="sm" textDecoration="underline">
        {openTxt}
      </Link>

      <Modal isOpen={isOpen} size={'2xl'} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            {content}

            {data && <div style={styles}>
              <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="date" interval="preserveStartEnd"/>
                <YAxis/>
                <Tooltip/>
                <Area type="monotone" dataKey="rate" name="Курс (UZS)" stroke="#8884d8" fill="#8884d8"/>
              </AreaChart>


            </div>}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Закрыть
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}