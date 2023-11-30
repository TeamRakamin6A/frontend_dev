import {
    Box,
    Heading,
    Image,
    Text
} from "@chakra-ui/react";
import Vector from "../../assets/landing2.png"

const About = () => {
    return (
        <>
            <Heading textAlign={"center"} color={"gray.500"} fontSize={20}>About Us</Heading>
            <Heading textAlign={"center"} color={"#223965"} fontSize={40}>Learn More <span style={{ color: "#2593CF" }}>About Us</span></Heading>
            <Box display={"flex"} alignItems={"center"} mx={40}>
                <Image src={Vector}></Image>
                <Text fontSize={20} mx={14}>Inventory management is a term also called inventory management, which is the process of searching for, then storing, and also the process of selling inventory, both in raw form and finished goods systematically.</Text>
                <Text fontSize={20} mx={14}>
                    The company will later take the goods from the storage area, and then transfer them to the manufacturing facility. These goods will be processed as raw materials so that they will later become finished goods or products.
                </Text>
            </Box>
        </>
    )
}

export default About;