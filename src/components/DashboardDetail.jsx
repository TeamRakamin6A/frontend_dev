import { Box, Text } from '@chakra-ui/react'

const DashboardDetail = ({ name, data, children }) => {
    return (
        <Box display={'flex'} flexDir={'column'} alignItems={'center'} gap={'10px'} justifyContent={'center'} w={"250px"} h={'205px'} rounded={'20px'} bgColor={'#FFFFFF'}>
            <Box bgColor={'#FFF0CE'} padding={'20px'} rounded={'50%'}>
                {children}
            </Box>
            <Text color={"#AAAAAA"} fontSize={'20px'}>{name}</Text>
            <Text fontWeight={'extrabold'} fontSize={'20px'}>{data}</Text>
        </Box>
    )
}

export default DashboardDetail