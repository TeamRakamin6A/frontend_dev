import {
    Box,
    Image,
    Text,
    Button,
    Heading
} from "@chakra-ui/react";
import Menu from "../../components/Menu";
import Vector from "../../assets/img-landing.png"
import About from "./About";
import Features from "./Features";
import Info from "./Info";

const Home = () => {
    return (
        <Box>
            <Menu />
            <Box display={"flex"} p={20} alignItems={"center"} id="home">
                <Box w={"50%"}>
                    <Heading color={"#223965"} fontSize={80}>Inventory Management</Heading>
                    <Text mt={6} fontSize={20}>Make it easy to manage best-selling products down to detailed availability in various storage locations directly through an inventory management app.</Text>
                    <Button px={10} mt={6} py={8} borderRadius={10} colorScheme={"blue"} fontSize={20}>Visit Us</Button>
                </Box>
                <Box w={"50%"}>
                    <Image src={Vector}></Image>
                </Box>
            </Box>
            <Box mt={"120px"} id="about">
                <About />
            </Box>
            <Box mt={"120px"} id="features">
                <Features />
            </Box>
            <Box mt={"120px"} id="info">
                <Info />
            </Box>
        </Box>
    )
}

export default Home;