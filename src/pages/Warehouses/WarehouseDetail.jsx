import { useParams } from "react-router-dom";
import { getWarehouseById } from "../../fetching/warehouse";
import { useEffect, useState } from "react";
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, Image, Text } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

const WarehouseDetail = () => {
  const { id } = useParams()
  const [warehouse, setWarehouse] = useState({})

  useEffect(() => {
    const fetchWarehouseDetail = async () => {
      try {
        const res = await getWarehouseById(+id)
        console.log(res);
        setWarehouse(res)
      } catch (error) {
        console.log(error);
      }
    }
    fetchWarehouseDetail()
  }, [])

  console.log(warehouse)


  return <Box w={'full'} h={'100vh'} bg={'#F3F3F3'} pb={'20px'}>
    <Box w={'full'} bgColor={'#FFFFFF'} padding={'28px'} shadow={'lg'}>
      <Text fontWeight={'extrabold'} fontSize={'25px'}>Warehose</Text>
      <Breadcrumb spacing='8px' color={'#AAAAAA'} separator={<ChevronRightIcon color='gray.500' />}>
        <BreadcrumbItem>
          <BreadcrumbLink href='/products'>Warehouse</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href='#'>Detail Warehouse</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Box>
    <Box padding={'22px'} margin={'20px'} bgColor={'#FFFFFF'} pb={'90px'}>
      <Text mt={'20px'} fontWeight={'bold'} fontSize={'25px'}>Detail Warehouse</Text>
      <Flex justify={'center'} align={'center'} gap={'60px'} mt={'60px'}>
        {/* <Box border={'2px solid #2C6BE5'} p={'10px'} rounded={'10px'}>
          <Image src={item.image_url} w={'300px'} h={'250px'} />
        </Box> */}
        <Box>
          <Box>
            <Text fontWeight={'bold'} fontSize={'20px'}>Name</Text>
            <Box w={'392px'} rounded={'10px'} display={'flex'} alignItems={'center'} pl={'20px'} border={'1px solid #D9D9D9'} h={'40px'}>{warehouse.title}</Box>
          </Box>
          <Box mt={'20px'}>
            <Text fontWeight={'bold'} fontSize={'20px'}>Address</Text>
            <Box w={'392px'} rounded={'10px'} display={'flex'} alignItems={'center'} pl={'20px'} border={'1px solid #D9D9D9'} h={'40px'}>{warehouse.address}</Box>
          </Box>
          <Box mt={'20px'}>
            <Text fontWeight={'bold'} fontSize={'20px'}>Stock Item</Text>
            <Box w={'392px'} rounded={'10px'} display={'flex'} alignItems={'center'} pl={'20px'} border={'1px solid #D9D9D9'} h={'40px'}>{warehouse.Item_Warehouse?.map(stock => stock.quantity).join(", ")}</Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  </Box>
};

export default WarehouseDetail;