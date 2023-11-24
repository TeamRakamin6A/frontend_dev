import { Box, Button, Center } from "@chakra-ui/react";


const Paginate = ({ totalPages, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPages); i++) {
        pageNumbers.push(i);
    }

    return (
        <Box mt={'20px'}>
            <Center>
                {pageNumbers.map((number) => (
                    <Button
                        key={number}
                        onClick={() => paginate(number)}
                        bgColor={currentPage === number ? 'gray.400' : 'gray'}
                        padding={'6px'}
                        ml={'10px'}
                        isDisabled={currentPage === number}
                    >
                        {number}
                    </Button>
                ))}
            </Center>
        </Box>
    )
}

export default Paginate