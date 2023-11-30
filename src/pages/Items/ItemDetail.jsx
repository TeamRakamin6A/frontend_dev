import { useParams } from "react-router-dom";
import { getItemByID } from "../../fetching/item";
import { useEffect, useState } from "react";
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Image, Text } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const ItemDetail = () => {
  const { id } = useParams()
  const [item, setItem] = useState({})

  useEffect(() => {
    const fetchItemDetail = async () => {
      try {
        const res = await getItemByID(+id)
        console.log(res);
        setItem(res)
      } catch (error) {
        console.log(error);
      }
    }
    fetchItemDetail()
  }, [id])

  return (
    <>
      <Navbar />
      <Box w={'full'} h={'100vh'} bg={'#F3F3F3'} pb={'20px'}>
        <Box w={'full'} bgColor={'#FFFFFF'} padding={'28px'} shadow={'lg'}>
          <Text fontWeight={'extrabold'} fontSize={'25px'}>Product</Text>
          <Breadcrumb spacing='8px' color={'#AAAAAA'} separator={<ChevronRightIcon color='gray.500' />}>
            <BreadcrumbItem>
              <BreadcrumbLink href='/products'>Product</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href='#'>Detail Product</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        <Box padding={'22px'} margin={'20px'} bgColor={'#FFFFFF'} pb={'90px'}>
          <Text mt={'20px'} fontWeight={'bold'} fontSize={'25px'}>Detail Product</Text>
          <Flex justify={'center'} align={'center'} gap={'60px'} mt={'60px'}>
            <Box border={'2px solid #2C6BE5'} p={'10px'} rounded={'10px'} >
              {
                item.image_url ? <Image src={item.image_url} w={'300px'} h={'250px'} />
                  : <Text w={'300px'} h={'250px'} display={'flex'} justifyContent={'center'} alignItems={'center'} fontSize={'30px'} fontWeight={'semibold'}>Image Not Found</Text>
              }

            </Box>
            <Box>
              <Box>
                <Text fontWeight={'bold'} fontSize={'20px'}>Product Name</Text>
                <Box w={'392px'} rounded={'10px'} display={'flex'} alignItems={'center'} pl={'20px'} border={'1px solid #D9D9D9'} h={'40px'}>{item.title}</Box>
              </Box>
              <Box mt={'20px'}>
                <Text fontWeight={'bold'} fontSize={'20px'}>Category</Text>
                <Box w={'392px'} padding={'20px'} rounded={'10px'} display={'flex'} alignItems={'center'} pl={'20px'} border={'1px solid #D9D9D9'} h={'40px'}>{item.Categories?.map(cat => cat.title).join(", ")}</Box>
              </Box>
              <Box mt={'20px'}>
                <Text fontWeight={'bold'} fontSize={'20px'}>Keywords</Text>
                <Box w={'392px'} rounded={'10px'} display={'flex'} alignItems={'center'} pl={'20px'} border={'1px solid #D9D9D9'} h={'40px'}>{item.keywords}</Box>
              </Box>
            </Box>
            <Box>
              <Box>
                <Text fontWeight={'bold'} fontSize={'20px'}>SKU</Text>
                <Box w={'392px'} rounded={'10px'} display={'flex'} alignItems={'center'} pl={'20px'} border={'1px solid #D9D9D9'} h={'40px'}>{item.sku}</Box>
              </Box>
              <Box mt={'20px'}>
                <Text fontWeight={'bold'} fontSize={'20px'}>Description</Text>
                <Box w={'392px'} rounded={'10px'} display={'flex'} alignItems={'center'} pl={'20px'} border={'1px solid #D9D9D9'} h={'40px'}>{item.description}</Box>
              </Box>
              <Box mt={'20px'}>
                <Text fontWeight={'bold'} fontSize={'20px'}>Product Price</Text>
                <Box w={'392px'} rounded={'10px'} display={'flex'} alignItems={'center'} pl={'20px'} border={'1px solid #D9D9D9'} h={'40px'}>{item.price}</Box>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>
      <Footer />
    </>
  )
};

export default ItemDetail;
