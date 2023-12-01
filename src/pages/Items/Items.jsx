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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  MenuItem,
  HStack,
  Input,
  Select,
  Flex,
  useToast,
} from '@chakra-ui/react'
import { MultiSelect } from "react-multi-select-component";
import { FaPlusCircle } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { deleteItem, getAllItems } from "../../fetching/item";
import { Link, useNavigate } from "react-router-dom";
import Paginate from "../../components/Paginate";
import convertPrice from "../../lib/convertPrice";
import { getAllCategories } from "../../fetching/category";
import Loading from "../../components/Loading";
import Navbar from "../../components/Navbar";
import CustomHeader from "../../components/Boxtop";
import Footer from "../../components/Footer";

const Items = () => {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const [options, setOptions] = useState({})
  const [item, setItem] = useState([])
  const [itemPerPage, setItemPerPage] = useState(10);
  const [deleteId, setDeleteId] = useState(0)
  const [totalPages, setTotalPage] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [q, setQ] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const cancelRef = useRef()

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true)
        const categoryIds = selected.map((option) => option.value)
        console.log(currentPage);
        const res = await getAllItems(currentPage, itemPerPage, "", categoryIds)
        setTotalPage(res.data.totalPages)
        setItem(res.data.items)

        const categoryResponse = await getAllCategories(1, 100, '');
        const categoryOptions = categoryResponse.data.map((cat) => ({
          label: cat.title,
          value: cat.id
        }))

        const mergedOptions = [
          ...categoryOptions
        ];

        setOptions(mergedOptions);
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    }

    fetchItems()
  }, [selected, currentPage, itemPerPage])

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = async () => {
    setLoading(true)
    const res = await getAllItems(currentPage - 1, itemPerPage, q, [])
    setItem(res.data.items)
    setTotalPage(res.data.totalPages)
    setLoading(false)
  }

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


  const handleDelete = async (id) => {
    try {
      const deleteRes = await deleteItem(id)
      onClose()
      toast({
        title: "Success",
        description: deleteRes.message,
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
      const res = await getAllItems(currentPage, itemPerPage, q, [])
      setItem(res.data.items)
      setTotalPage(res.data.totalPages)
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: error.response.data.message,
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  const handleDeleteClick = async (id) => {
    onOpen()
    setDeleteId(id)
  }

  const handleItemPage = async (e) => {
    setItemPerPage(+e.target.value)
  }

  if (loading) {
    return <Loading />
  }

  return <>
    <Navbar />
    <Box w={'full'} bg={'#F3F3F3'} pb={'20px'}>
      <CustomHeader title={'Product'} subtitle={'Product List'} href={'products'} subhref={`products`} />
      <Box padding={'22px'} margin={'20px'} bgColor={'#FFFFFF'}>
        <Text mt={'20px'} fontWeight={'bold'} fontSize={'25px'}>Product List</Text>
        <Button mt={'20px'} onClick={() => navigate('/add-products')} height='48px' width='200px' colorScheme="linkedin" ><FaPlusCircle fontSize={'30px'} />
          <Text ml={'10px'} >Add Product</Text>
        </Button>
        <HStack maxW={'600px'} mt={'25px'}>
          <Input placeholder='search product' onChange={(e) => setQ(e.target.value)} />
          <Button type="button" onClick={handleSearch}>Search</Button>
        </HStack>
        <Box maxW={'600px'} mt={'25px'}>
          <Text>Filter By Category</Text>
          <MultiSelect
            options={options}
            h={'40px'}
            value={selected}
            onChange={setSelected}
            labelledBy="Search Product"
          />
        </Box>
        <Flex justify={'flex-end'}>
          <Box w={'140px'} mt={'20px'}>
            <Select placeholder='Item Page' onChange={handleItemPage} value={itemPerPage}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </Select>
          </Box>
        </Flex>

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
                      <Td>{product.sku || "null"}</Td>
                      <Td>{convertPrice(product.price) || "null"}</Td>
                      <Td>
                        <Box>
                          <Menu>
                            <MenuButton as={Button} colorScheme='linkedin' variant='outline'>
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
                              <MenuItem onClick={() => handleDeleteClick(product.id)}>Delete Item</MenuItem>
                            </MenuList>
                          </Menu>
                        </Box>
                      </Td>
                    </Tr>
                  ))
                }
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
                        Are you sure?  You cant undo this action afterwards. {deleteId}
                      </AlertDialogBody>

                      <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                          Cancel
                        </Button>
                        <Button colorScheme='red' onClick={() => handleDelete(deleteId)} ml={3}>
                          Delete
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Paginate totalPages={totalPages} prevPage={prevPage} nextPage={nextPage} currentPage={currentPage} paginate={paginate} />
      </Box>
    </Box >
    <Footer />
  </>
};

export default Items;