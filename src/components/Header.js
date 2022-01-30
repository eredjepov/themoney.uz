import {Box, useColorModeValue as mode} from '@chakra-ui/react'
import * as React from "react";
import { NavContent } from './NavContent'


export default function Header() {
    return (
        <>
            <Box as="header" >
                <Box bg={mode('white', 'gray.800')} position="relative" zIndex="10">
                    <Box as="nav" aria-label="Главная навигация" maxW="7xl" mx="auto" px={{base: '6', md: '8'}}>
                        <NavContent.Mobile display={{base: 'flex', lg: 'none'}}/>
                        <NavContent.Desktop display={{base: 'none', lg: 'flex'}}/>
                    </Box>
                </Box>
            </Box>
        </>
    );
}