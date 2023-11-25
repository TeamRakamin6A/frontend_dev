import { Box, Flex, HStack } from "@chakra-ui/react";
import { FaBox, FaUserFriends, FaWarehouse, FaFileInvoice, FaHandHoldingUsd } from 'react-icons/fa'
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { MdPayments } from "react-icons/md";
import { getDataDashboard } from "../fetching/dashboard";
import DashboardDetail from "../components/DashboardDetail";
import Chart from "../components/Chart";
import Loading from "../components/Loading";


const Dashboard = () => {
  const [data, setData] = useState('null')
  const [loading, setLoading] = useState(false)

  const fetchDashboard = async () => {
    try {
      const data = await getDataDashboard()
      setData(data)
      setLoading(false)
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    setLoading(true)
    fetchDashboard()
  }, [])

  if (loading) {
    return (
      <Loading />
    )
  }
  console.log(data);

  return (
    <>
      <Navbar />
      <Box w={"full"} minH={"100vh"} bgColor={"#F3F3F3"} padding={'30px'}>
        <Flex direction={'row'} wrap={'wrap'} justify={'center'} align={'center'} gap={'90px'} pt={'40px'}>
          <Box>
            <HStack gap={'20px'}>
              <DashboardDetail name={"Product"} data={data?.total_products}>
                <FaBox color={'#3876BF'} fontSize={'42px'} />
              </DashboardDetail>
              <DashboardDetail name={"Order"} data={data?.total_orders}>
                <MdPayments color={'#3876BF'} fontSize={'42px'} />
              </DashboardDetail>
              <DashboardDetail name={"Customer"} data={data?.total_customers}>
                <FaUserFriends color={'#3876BF'} fontSize={'42px'} />
              </DashboardDetail>
            </HStack>
            <HStack gap={'20px'} mt={'20px'}>
              <DashboardDetail name={"Warehouse"} data={data?.total_warehouses}>
                <FaWarehouse color={'#3876BF'} fontSize={'42px'} />
              </DashboardDetail>
              <DashboardDetail name={"Total Expenses"} data={data?.total_expenses}>
                <FaFileInvoice color={'#3876BF'} fontSize={'42px'} />
              </DashboardDetail>
              <DashboardDetail name={"Total Revenue"} data={data?.total_revenues}>
                <FaHandHoldingUsd color={'#3876BF'} fontSize={'42px'} />
              </DashboardDetail>
            </HStack>
          </Box>
          <Box w={'370px'} h={'425px'} p={'30px'} rounded={'20px'} bgColor={'#FFFFFF'}>
            <Chart datas={data} />
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Dashboard;
