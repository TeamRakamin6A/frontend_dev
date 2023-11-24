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
  Image,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  MenuItem,
} from '@chakra-ui/react'
import { MultiSelect } from "react-multi-select-component";
import { ChevronRightIcon } from '@chakra-ui/icons'
import { FaPlusCircle } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { getAllItems } from "../../fetching/item";
import { Link, useNavigate } from "react-router-dom";
import Paginate from "../../components/Paginate";

const Items = () => {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const [options, setOptions] = useState({})
  const [item, setItem] = useState([])
  const [itemPerPage, setItemPerPage] = useState(10);
  const [totalPages, setTotalPage] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

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
        const res = await getAllItems(currentPage, itemPerPage, q, categoryIds)
        setTotalPage(res.data.totalPages)
        setItem(res.data.items)
      } catch (error) {
        console.log(error);
      }
    }

    fetchItems()
  }, [selected, currentPage, itemPerPage])

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  console.log(currentPage);

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

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

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
      <Box maxW={'600px'} mt={'40px'}>
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
                <Th><Text fontSize={'15px'}>Name</Text></Th>
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
                    <Td><Link to={`/products/${product.id}`}>{product.title || "null"}</Link></Td>
                    <Td>{product.keywords || "null"}</Td>
                    <Td>{product.sku || "null"}</Td>
                    <Td>{product.price || "null"}</Td>
                    <Td>
                      <Box>
                        <Menu>
                          <MenuButton as={Button} colorScheme='blue' variant='outline'>
                            Action
                          </MenuButton>
                          <MenuList>
                            <MenuItem>
                              <Link
                                to={`/edit-products/${product.id}`}
                                state={{ productData: product }}
                              >
                                Edit Item
                              </Link>
                            </MenuItem>
                            <MenuItem onClick={onOpen}>Delete Item</MenuItem>
                            <AlertDialog
                              isOpen={isOpen}
                              leastDestructiveRef={cancelRef}
                              onClose={onClose}
                            >
                              <AlertDialogOverlay>
                                <AlertDialogContent>
                                  <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                    Delete Customer
                                  </AlertDialogHeader>

                                  <AlertDialogBody>
                                    Are you sure? You cant undo this action afterwards.
                                  </AlertDialogBody>

                                  <AlertDialogFooter>
                                    <Button ref={cancelRef} onClick={onClose}>
                                      Cancel
                                    </Button>
                                    <Button colorScheme='red' onClick={onClose} ml={3}>
                                      Delete
                                    </Button>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialogOverlay>
                            </AlertDialog>
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
      <Paginate totalPages={totalPages} prevPage={prevPage} nextPage={nextPage} currentPage={currentPage} paginate={paginate} />
    </Box>
  </Box >;
};

export default Items;
