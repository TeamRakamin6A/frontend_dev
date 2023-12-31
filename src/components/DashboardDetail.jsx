import { Box, Text } from '@chakra-ui/react'
import convertPrice from '../lib/convertPrice'

// eslint-disable-next-line react/prop-types
const DashboardDetail = ({ name, data, children, convert = false }) => {
    return (
        <Box display={'flex'} flexDir={'column'} alignItems={'center'} gap={'10px'} justifyContent={'center'} w={"250px"} h={'205px'} rounded={'20px'} bgColor={'#FFFFFF'}>
            <Box bgColor={'#FFF0CE'} padding={'20px'} rounded={'50%'}>
                {children}
            </Box>
            <Text color={"#AAAAAA"} fontSize={'20px'}>{name}</Text>
            <Text fontWeight={'extrabold'} fontSize={'20px'}>{convert && data ? convertPrice(data) : data}</Text>
        </Box>
    )
}

export default DashboardDetail 