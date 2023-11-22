import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { FaBox, FaUserFriends, FaWarehouse, FaFileInvoice, FaHandHoldingUsd } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { MdPayments } from "react-icons/md";
import { getDataDashboard } from "../fetching/dashboard";


const Dashboard = () => {
  const [data, setData] = useState()

  const fetchDashboard = async () => {
    try {
      const data = await getDataDashboard()
      setData(data)
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    fetchDashboard()
  }, [])
  console.log(data);

  return (
    <>
      <Navbar />
      <Box w={"full"} minH={"100vh"} bgColor={"#F3F3F3"} padding={'30px'}>
        <Flex direction={'row'} wrap={'wrap'} pt={'40px'}>
          <HStack gap={'20px'}>
            <Box display={'flex'} flexDir={'column'} alignItems={'center'} gap={'10px'} justifyContent={'center'} w={"250px"} h={'205px'} rounded={'20px'} bgColor={'#FFFFFF'}>
              <Box bgColor={'#FFF0CE'} padding={'20px'} rounded={'50%'}>
                <FaBox color={'#3876BF'} fontSize={'32px'} />
              </Box>
              <Text color={"#AAAAAA"} fontSize={'18px'}>Product</Text>
              <Text>{data?.total_products} Units</Text>
            </Box>
            <Box display={'flex'} flexDir={'column'} alignItems={'center'} gap={'10px'} justifyContent={'center'} w={"250px"} h={'205px'} rounded={'20px'} bgColor={'#FFFFFF'}>
              <Box bgColor={'#FFF0CE'} padding={'20px'} rounded={'50%'}>
                <MdPayments color={'#3876BF'} fontSize={'32px'} />
              </Box>
              <Text color={"#AAAAAA"} fontSize={'18px'}>Order</Text>
              <Text>{data?.total_orders} Orders</Text>
            </Box>
            <Box display={'flex'} flexDir={'column'} alignItems={'center'} gap={'10px'} justifyContent={'center'} w={"250px"} h={'205px'} rounded={'20px'} bgColor={'#FFFFFF'}>
              <Box bgColor={'#FFF0CE'} padding={'20px'} rounded={'50%'}>
                <FaUserFriends color={'#3876BF'} fontSize={'32px'} />
              </Box>
              <Text color={"#AAAAAA"} fontSize={'18px'}>Customer</Text>
              <Text>{data?.total_customers} Customers</Text>
            </Box>
          </HStack>
          <HStack gap={'20px'} mt={'20px'}>
            <Box display={'flex'} flexDir={'column'} alignItems={'center'} gap={'10px'} justifyContent={'center'} w={"250px"} h={'205px'} rounded={'20px'} bgColor={'#FFFFFF'}>
              <Box bgColor={'#FFF0CE'} padding={'20px'} rounded={'50%'}>
                <FaWarehouse color={'#3876BF'} fontSize={'32px'} />
              </Box>
              <Text color={"#AAAAAA"} fontSize={'18px'}>Warehouse</Text>
              <Text>{data?.total_warehouses} Warehouses</Text>
            </Box>
            <Box display={'flex'} flexDir={'column'} alignItems={'center'} gap={'10px'} justifyContent={'center'} w={"250px"} h={'205px'} rounded={'20px'} bgColor={'#FFFFFF'}>
              <Box bgColor={'#FFF0CE'} padding={'20px'} rounded={'50%'}>
                <FaFileInvoice color={'#3876BF'} fontSize={'32px'} />
              </Box>
              <Text color={"#AAAAAA"} fontSize={'18px'}>Total Expense</Text>
              <Text>{data?.total_expenses}</Text>
            </Box>
            <Box display={'flex'} flexDir={'column'} alignItems={'center'} gap={'10px'} justifyContent={'center'} w={"250px"} h={'205px'} rounded={'20px'} bgColor={'#FFFFFF'}>
              <Box bgColor={'#FFF0CE'} padding={'20px'} rounded={'50%'}>
                <FaHandHoldingUsd color={'#3876BF'} fontSize={'32px'} />
              </Box>
              <Text color={"#AAAAAA"} fontSize={'18px'}>Total Revenue</Text>
              <Text>{data?.total_revenues}</Text>
            </Box>
          </HStack>
        </Flex>
      </Box>
    </>
  );
};

export default Dashboard;
