import {
    Box,
    SimpleGrid,
    Image,
    Heading,
    Text,
    Center,
    Flex,
} from "@chakra-ui/react";
import Team1 from "../../assets/team/jalu.png"
import Team2 from "../../assets/team/maul.png"
import Team3 from "../../assets/team/andi.png"
import Team4 from "../../assets/team/ab.png"
import Team5 from "../../assets/team/rangga.png"
import Team6 from "../../assets/team/reygan.png"
import Team7 from "../../assets/team/surya.png"

const Info = () => {
    return (
        <>
            <Heading textAlign={"center"} color={"gray.500"} fontSize={20} mb={20}>Team</Heading>
            <Flex gap={"80px"} flexWrap={"wrap"} justifyContent={'center'} mb={"20px"} w={'1200px'} mx={"auto"}>
                <Box h={420} w={"fit-content"} boxShadow={"lg"} display={"flex"} flexDirection={"column"} alignItems={"center"} textAlign={"center"}>
                    <Box>
                        <Image src={Team1} h={240} w={240}></Image>
                    </Box>
                    <Heading fontSize={20} fontWeight={"medium"} w={40} my={4}>Ahmad Jalu Fahreza</Heading>
                    <Box display={"flex"} gap={'20px'}>
                        <Box>
                            <Heading fontSize={14}>Backend</Heading>
                            <Text>Supplier</Text>
                        </Box>
                        <Box mb={10}>
                            <Heading fontSize={14}>Frontend</Heading>
                            <Text>Supplier</Text>
                            <Text>Customer</Text>
                            <Text>Category</Text>
                        </Box>
                    </Box>
                </Box>
                <Box h={420} w={"fit-content"} boxShadow={"lg"} display={"flex"} flexDirection={"column"} alignItems={"center"} textAlign={"center"}>
                    <Box>
                        <Image src={Team2} h={240} w={240}></Image>
                    </Box>
                    <Heading fontSize={20} fontWeight={"medium"} w={40} my={4}>Maulana Rafinda</Heading>
                    <Box display={"flex"} gap={'20px'}>
                        <Box>
                            <Heading fontSize={14}>Backend</Heading>
                            <Text>Items</Text>
                            <Text>Supply Orders</Text>
                            <Text>Warehouse</Text>
                        </Box>
                        <Box mb={10}>
                            <Heading fontSize={14}>Frontend</Heading>
                            <Text>Order</Text>
                            <Text>Warehouse</Text>
                        </Box>
                    </Box>
                </Box>
                <Box h={420} w={"fit-content"} boxShadow={"lg"} display={"flex"} flexDirection={"column"} alignItems={"center"} textAlign={"center"}>
                    <Box>
                        <Image src={Team5} h={240} w={240}></Image>
                    </Box>
                    <Heading fontSize={20} fontWeight={"medium"} w={40} my={4}>Rangga Krisna</Heading>
                    <Box display={"flex"} gap={'20px'}>
                        <Box>
                            <Heading fontSize={14}>Backend</Heading>
                            <Text>Authentication</Text>
                            <Text>Order</Text>
                            <Text>Warehouse</Text>
                            <Text>Dashboard</Text>
                        </Box>
                        <Box mb={10}>
                            <Heading fontSize={14}>Frontend</Heading>
                            <Text>Dashboard</Text>
                            <Text>Item/Product</Text>
                        </Box>
                    </Box>
                </Box>
                <Box h={420} w={"fit-content"} boxShadow={"lg"} display={"flex"} flexDirection={"column"} alignItems={"center"} textAlign={"center"}>
                    <Box>
                        <Image src={Team6} h={240} w={240}></Image>
                    </Box>
                    <Heading fontSize={20} fontWeight={"medium"} w={40} my={4}>Reygan Fadhilah</Heading>
                    <Box display={"flex"} gap={'20px'}>
                        <Box>
                            <Heading fontSize={14}>Backend</Heading>
                            <Text>Customers</Text>
                        </Box>
                        <Box mb={10}>
                            <Heading fontSize={14}>Frontend</Heading>
                            <Text>Supply Orders</Text>
                            <Text>Landing Page</Text>
                        </Box>
                    </Box>
                </Box>
                <Box h={420} w={"fit-content"} boxShadow={"lg"} display={"flex"} flexDirection={"column"} alignItems={"center"} textAlign={"center"}>
                    <Box>
                        <Image src={Team3} h={240} w={240}></Image>
                    </Box>
                    <Heading fontSize={20} fontWeight={"medium"} w={40} my={4}>Andi Ariski</Heading>
                    <Box display={"flex"} gap={'20px'}>
                        <Box>
                            <Heading fontSize={14}>Backend</Heading>
                            <Text>Seeding</Text>
                        </Box>
                    </Box>
                </Box>
                <Box h={420} w={"fit-content"} boxShadow={"lg"} display={"flex"} flexDirection={"column"} alignItems={"center"} textAlign={"center"}>
                    <Box>
                        <Image src={Team7} h={240} w={240}></Image>
                    </Box>
                    <Heading fontSize={20} fontWeight={"medium"} w={40} my={4}>Surya Adi</Heading>
                    <Box display={"flex"} gap={'20px'}>
                        <Box>
                            <Heading fontSize={14}>Backend</Heading>
                            <Text>Seeding</Text>
                        </Box>
                    </Box>
                </Box>
                <Box h={420} w={"fit-content"} boxShadow={"lg"} display={"flex"} flexDirection={"column"} alignItems={"center"} textAlign={"center"}>
                    <Box>
                        <Image src={Team4} h={240} w={240}></Image>
                    </Box>
                    <Heading fontSize={20} fontWeight={"medium"} w={40} my={4}>Ahmad Kurnia</Heading>
                    <Box display={"flex"} >
                        <Box>
                            <Heading fontSize={14}>Backend</Heading>
                            <Text>Categories</Text>
                        </Box>
                    </Box>
                </Box>
            </Flex>
        </>
    )
}

export default Info;