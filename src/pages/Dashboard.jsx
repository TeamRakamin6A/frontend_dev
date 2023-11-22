import { Box, Flex, Text } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <Box w={"full"} minH={"100vh"} bgColor={"#F3F3F3"} padding={'20px'}>
        <Text>Tessss</Text>
        <Flex direction={'row'}>
          <Box gap={'10px'}>
            <Box w={"250px"} h={'205px'} rounded={'20px'} bgColor={'#FFFFFF'}>
              1
            </Box>
            <Box w={"250px"} h={'205px'} rounded={'20px'} bgColor={'#FFFFFF'}>
              2
            </Box>
            <Box w={"250px"} h={'205px'} rounded={'20px'} bgColor={'#FFFFFF'}>
              3
            </Box>
          </Box>
          <Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Dashboard;
