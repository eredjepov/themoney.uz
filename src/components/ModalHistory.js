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
import { LineChart, Line, XAxis, YAxis } from "recharts";


const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};



const data = [{
  "id": 1123,
  "rate": "10880",
  "bankId": 2,
  "date": "2021-12-21",
  "name": "InfinBank"
},
  {
    "id": 1124,
    "rate": "10880",
    "bankId": 2,
    "date": "2021-12-21",
    "name": "InfinBank"
  },
  {
    "id": 1146,
    "rate": "10880",
    "bankId": 2,
    "date": "2021-12-21",
    "name": "InfinBank"
  },
  {
    "id": 1147,
    "rate": "10880",
    "bankId": 2,
    "date": "2021-12-21",
    "name": "InfinBank"
  },
  {
    "id": 1160,
    "rate": "10880",
    "bankId": 2,
    "date": "2021-12-21",
    "name": "InfinBank"
  },
  {
    "id": 1188,
    "rate": "10880",
    "bankId": 2,
    "date": "2021-12-21",
    "name": "InfinBank"
  },
  {
    "id": 1215,
    "rate": "10880",
    "bankId": 2,
    "date": "2021-12-21",
    "name": "InfinBank"
  }];



export default function ModalHistory({content, title, openTxt, ...rest}) {

  const {isOpen, onOpen, onClose} = useDisclosure()
  return (
    <>
      <Link onClick={()=> {onOpen()}} color={'gray.400'} fontSize="sm" textDecoration="underline">
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
            <div style={styles}>
              <LineChart
                width={500}
                height={300}
                data={data}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <Line type="monotone" dataKey="rate" stroke="#8884d8" dot={true} />
                <XAxis dataKey="date" />
                <YAxis />
              </LineChart>
            </div>
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