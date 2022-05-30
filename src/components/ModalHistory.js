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
import {LineChart, Line, XAxis, YAxis} from "recharts";
import {useEffect, useState} from "react";


export default function ModalHistory({content, title, openTxt, toCurency, direction, id}) {

  const url = `https://upd.dollaruz.biz/history/rates/${direction}/${toCurency}/${id}`;

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
    textAlign: "center"
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
            {/*<RateHistory {...rest}/>*/}
            {data && <div style={styles}>
              <LineChart
                width={500}
                height={300}
                data={data}
                margin={{top: 5, right: 20, bottom: 5, left: 0}}
              >
                <Line type='natural' dataKey="rate" stroke="#8884d8" dot={true}/>
                <XAxis dataKey="date"/>
                <YAxis/>
              </LineChart>
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