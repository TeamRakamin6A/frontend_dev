import { useNavigate, useParams } from "react-router-dom";
import { getItemByID } from "../../fetching/item";
import { useEffect, useState } from "react";
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, Image, Text } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

const ItemDetail = () => {
  const { id } = useParams()
  const [item, setItem] = useState()

  useEffect(() => {
    const fetchItemDetail = async () => {
      try {
        const res = await getItemByID(+id)
        setItem(res.data.items)
      } catch (error) {
        console.log(error);
      }
    }
    fetchItemDetail()
  }, [])


  return <Box w={'full'} h={'100vh'} bg={'#F3F3F3'} pb={'20px'}>
    <Box w={'full'} bgColor={'#FFFFFF'} padding={'28px'} shadow={'lg'}>
      <Text fontWeight={'extrabold'} fontSize={'25px'}>Product</Text>
      <Breadcrumb spacing='8px' color={'#AAAAAA'} separator={<ChevronRightIcon color='gray.500' />}>
        <BreadcrumbItem>
          <BreadcrumbLink href='#'>Product</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href='#'>Detail Product</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Box>
    <Box padding={'22px'} margin={'20px'} bgColor={'#FFFFFF'}>
      <Text mt={'20px'} fontWeight={'bold'} fontSize={'25px'}>Detail Product</Text>
      <Flex justify={'center'} align={'center'}>
        <Box>
          <Image src={item.image_url} />
        </Box>
      </Flex>
    </Box>
  </Box>
};

export default ItemDetail;
