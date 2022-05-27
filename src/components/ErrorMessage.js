import * as React from "react";
import {Box} from "@chakra-ui/react";

const ErrorMessage = () => (<Box maxW={{base: '3xl', lg: '7xl',}} mx="auto" px={{base: '4', md: '6', lg: '8',}} py={{
  base: '6', md: '8', lg: '12',
}}>
  <div>Что то пошло не так, попробуй лучше позднее...</div>
</Box>)

export default ErrorMessage