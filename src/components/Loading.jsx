import { Box, Spinner, AbsoluteCenter } from "@chakra-ui/react";

const Loading = () => {
    return (
        <Box w={"full"} minH={"100vh"} position='relative' h='100px'>
            <AbsoluteCenter axis='both'>
                <Spinner
                    thickness='14px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                    width="180px"
                    height="180px"
                />
            </AbsoluteCenter>
        </Box>
    )
}

export default Loading