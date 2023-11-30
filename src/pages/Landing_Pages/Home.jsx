import {
    Box,
    Image,
    Text,
    Button,
    Heading
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Menu from "../../components/Menu";
import Vector from "../../assets/img-landing.png"

const Home = () => {
    return (
        <div>
            <Menu />
            <Box display={"flex"} p={20} alignItems={"center"}>
                <Box w={"50%"}>
                    <Heading color={"#223965"} fontSize={80}>Inventory Management</Heading>
                    <Text mt={6} fontSize={20}>Make it easy to manage best-selling products down to detailed availability in various storage locations directly through an inventory management app.</Text>
                    <Button px={10} mt={6} py={8} borderRadius={10} colorScheme={"blue"} fontSize={20}>Visit Us</Button>
                </Box>
                <Box w={"50%"}>
                    <Image src={Vector}></Image>
                </Box>
            </Box>
        </div>
    )
}

export default Home;