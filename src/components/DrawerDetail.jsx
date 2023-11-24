import { HStack, Text } from '@chakra-ui/react'
import { Navigate, useNavigate } from 'react-router-dom'

const DrawerDetail = ({ children, nav, name }) => {
    const navigate = useNavigate()
    return (
        <HStack onClick={() => navigate(`/${nav}`)} transition={'all .3s ease-out'} rounded={'20px'} p={'10px'} _hover={{ backgroundColor: 'blue.200', color: 'white', cursor: 'pointer' }}>
            {children}
            <Text fontSize={'28px'}>{name}</Text>
        </HStack>
    )
}

export default DrawerDetail