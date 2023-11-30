import {
    Box,
    Image,
    Text,
    Button
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../assets/Rectangle3.png"

const Menu = () => {
    return (
        <>
            <Box w={"full"} h={"fit-content"} bg={"white"} display={"flex"} alignItems={'center'} justifyContent="space-between">
                <Box p={10} display={"flex"} alignItems={'center'}>
                    <Image src={logo} w={'50px'} mr={'8px'} />
                    <Text fontWeight={"extrabold"} fontSize={24}><Box display={'inline'} as="span" color={"blue"}>STOCK</Box> WISE</Text>
                </Box>
                <Box display={"flex"} alignItems={'center'}>
                    <Text fontSize={20} fontWeight={"medium"} mr={10}>
                        <Link color="gray.600" to="/home">
                            Home
                        </Link>
                    </Text>
                    <Text fontSize={20} fontWeight={"medium"} mr={10}>
                        <Link color="gray.600" to="/about">
                            About us
                        </Link>
                    </Text>
                    <Text fontSize={20} fontWeight={"medium"} mr={10}>
                        <Link color="gray.600" to="/features">
                            Features
                        </Link>
                    </Text>
                    <Text fontSize={20} fontWeight={"medium"} mr={10}>
                        <Link color="gray.600" to="/info">
                            Info
                        </Link>
                    </Text>
                    <Button as={Link} to="/login" px={10} py={8} borderRadius={10} fontSize={20} mr={10} colorScheme="blue">Login</Button>
                </Box>
            </Box>
        </>
    )
}

export default Menu;