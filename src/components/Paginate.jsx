import { Box, Button, Flex } from "@chakra-ui/react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";


const Paginate = ({ totalPages, paginate, currentPage, prevPage, nextPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPages); i++) {
        pageNumbers.push(i);
    }

    return (
        <Box mt={'20px'}>
            <Flex justify={'flex-end'}>
                {currentPage > 1 ?
                    <Button onClick={prevPage} padding={'6px'} ml={'10px'}>
                        <FaAngleLeft />
                    </Button> : ""
                }
                {pageNumbers.map((number) => (
                    <Button
                        key={number}
                        onClick={() => paginate(number)}
                        bgColor={currentPage === number ? '#2C6AE5' : '#D9D9D9'}
                        padding={'6px'}
                        ml={'10px'}
                    >
                        {number}
                    </Button>
                ))}
                {currentPage === totalPages ? "" :
                    <Button onClick={nextPage} padding={'6px'} ml={'10px'}>
                        <FaAngleRight />
                    </Button>
                }
            </Flex>
        </Box>
    )
}

export default Paginate