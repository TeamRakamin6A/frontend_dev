import { useParams } from "react-router-dom";
import { getItemByID } from "../../fetching/item";
import { useEffect, useState } from "react";
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text } from "@chakra-ui/react";
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
  }, [id])

  return <Box w={'full'} bg={'#F3F3F3'} pb={'20px'}>
    <Box w={'full'} bgColor={'#FFFFFF'} padding={'28px'} shadow={'lg'}>
      <Text fontWeight={'extrabold'} fontSize={'25px'}>Product</Text>
      <Breadcrumb spacing='8px' color={'#AAAAAA'} separator={<ChevronRightIcon color='gray.500' />}>
        <BreadcrumbItem>
          <BreadcrumbLink href='#'>Product</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href='#'>Product List</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Box>
  </Box>
};

export default ItemDetail;
