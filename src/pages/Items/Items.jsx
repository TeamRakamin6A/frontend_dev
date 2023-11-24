import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/breadcrumb";
import {
  Box, Button, Text, Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  Image,
} from '@chakra-ui/react'
import { MultiSelect } from "react-multi-select-component";
import { ChevronRightIcon } from '@chakra-ui/icons'
import { FaPlusCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getAllItems } from "../../fetching/item";
import { useNavigate } from "react-router-dom";

const Items = () => {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const [options, setOptions] = useState({})
  const [item, setItem] = useState([])


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const q = selected
          .filter((option) => !option.label.startsWith('cat'))
          .map((option) => option.value)
          .join(',');

        const categoryIds = selected
          .filter((option) => option.label.startsWith('cat'))
          .map((option) => option.value)
          .join(',');

        console.log(q);
        const res = await getAllItems(q, categoryIds)
        setItem(res.data.items)
      } catch (error) {
        console.log(error);
      }
    }

    fetchItems()
  }, [selected])

  useEffect(() => {
    const titleOptions = item.map((product) => ({
      label: product.title || 'null',
      value: product.title || 'null',
    }));

    const skuOptions = item.map((product) => ({
      label: product.sku || 'null',
      value: product.sku || 'null',
    }));

    const keywordOptions = item.map((product) => ({
      label: product.keywords || 'null',
      value: product.keywords || 'null',
    }));

    const categoryOptions = item.flatMap((product) =>
      product.Categories.map((cat) => ({
        label: `category ${cat.title}` || "null",
        value: cat.id
      }))
    );

    const mergedOptions = [
      ...titleOptions,
      ...skuOptions,
      ...keywordOptions,
      ...categoryOptions
    ];

    setOptions(mergedOptions);
  }, [item]);

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
    <Box padding={'22px'} margin={'20px'} bgColor={'#FFFFFF'}>
      <Text mt={'20px'} fontWeight={'bold'} fontSize={'25px'}>Product List</Text>
      <Button mt={'20px'} onClick={() => navigate('/add-products')} height='48px' width='200px' bgColor={'#2C6AE5'} color={'white'}><FaPlusCircle fontSize={'30px'} />
        <Text ml={'10px'} >Add Product</Text>
      </Button>
      <Box maxW={'600px'} mt={'40px'}  >
        <MultiSelect
          options={options}
          h={'40px'}
          value={selected}
          onChange={setSelected}
          labelledBy="Search Product"
        />
      </Box>
      <Box mt={'40px'}>
        <TableContainer rounded={'10px'} overflowX={'auto'} border={'2px solid #D9D9D9'}>
          <Table variant='simple'>
            <Thead>
              <Tr borderBottom={'2px solid #D9D9D9'} >
                <Th><Checkbox /></Th>
                <Th><Text fontSize={'15px'}>Image</Text></Th>
                <Th><Text fontSize={'15px'}>Name</Text></Th>
                <Th><Text fontSize={'15px'}>Description</Text></Th>
                <Th><Text fontSize={'15px'}>Category</Text></Th>
                <Th><Text fontSize={'15px'}>Keywords</Text></Th>
                <Th><Text fontSize={'15px'}>SKU</Text></Th>
                <Th><Text fontSize={'15px'}>Price</Text></Th>
                <Th><Text fontSize={'15px'}>Action</Text></Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                item?.map((product) => (
                  <Tr key={product.id} borderBottom={'2px solid #D9D9D9'}>
                    <Td><Checkbox /></Td>
                    <Td>
                      <Box w={'120px'}>
                        <Image src={product.image_url} />
                      </Box>
                    </Td>
                    <Td>{product.title || "null"}</Td>
                    <Td>{product.description || "null"}</Td>
                    <Td>{product.Categories?.length > 0 ? (
                      product.Categories.map((cat) => cat.title)
                    ) : (
                      "null"
                    )}
                    </Td>
                    <Td>{product.keywords || "null"}</Td>
                    <Td>{product.sku || "null"}</Td>
                    <Td>{product.price || "null"}</Td>
                    <Td>
                      <Box>
                        <Menu closeOnSelect={false}>
                          <MenuButton as={Button} colorScheme='blue' variant='outline'>
                            Action
                          </MenuButton>
                          <MenuList minWidth='240px'>
                            <MenuItemOption value='email'>Edit Item</MenuItemOption>
                            <MenuItemOption value='phone'>Delete Item</MenuItemOption>
                          </MenuList>
                        </Menu>
                      </Box>
                    </Td>
                  </Tr>
                ))
              }
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  </Box >;
};

export default Items;
