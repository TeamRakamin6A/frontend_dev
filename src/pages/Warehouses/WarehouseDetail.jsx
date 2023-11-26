import { useParams } from "react-router-dom";
import { getWarehouseById, updateQuantity, addItemToWarehouse } from "../../fetching/warehouse";
import { getAllItems } from "../../fetching/item"
import { useEffect, useState, useRef } from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Image,
  Table,
  Tbody,
  Text,
  Thead,
  Th,
  Td,
  Tr,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Link,
  Select
} from "@chakra-ui/react";
import {
  FaCaretDown,
  FaChevronLeft,
  FaChevronRight,
  FaRegEdit,
} from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading"

const WarehouseDetail = () => {
  const { id } = useParams()
  const [warehouse, setWarehouse] = useState({})
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenAdd, onOpen: onOpenAdd, onClose: onCloseAdd } = useDisclosure();
  const quantityRef = useRef(0)
  const newItemQuantityRef = useRef(0)
  const toast = useToast();
  const [itemList, setItemList] = useState([]);
  const selectedItemRef = useRef(0);


  const fetchWarehouseDetail = async () => {
    try {
      const res = await getWarehouseById(+id)
      const itemResponse = await getAllItems(1, 100, "", []);
      setItemList(itemResponse.data.items)
      setItems(res.Items)
      setWarehouse(res)
      setLoading(false)
    } catch (error) {
      console.log(error)
      toast({
        title: 'Error fetching warehouse detail',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchWarehouseDetail()
  }, [])

  const handleUpdateQuantity = async (id) => {
    try {
      let payload = {
        id: warehouse.id,
        quantity: +quantityRef.current.value,
        item_id: +id
      }

      await updateQuantity(payload)
      await fetchWarehouseDetail();
      onClose()
    } catch (err) {
      console.log(err)
    }
  }

  const handleAddItem = async () => {
    try {
      const payload = {
        id: warehouse.id,
        item_id: +selectedItemRef.current.value,
        quantity: +newItemQuantityRef.current.value
      }

      const { message } = await addItemToWarehouse(payload);
      await fetchWarehouseDetail();
      toast({
        title: 'Add new item',
        description: `${message}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      onCloseAdd();
    } catch (err) {
      console.log(err);
      toast({
        title: 'Error addItem',
        description: "Error addItem",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <Navbar />
      <Box w={'full'} h={'100vh'} bg={'#F3F3F3'} pb={'20px'}>
        <Box w={'full'} bgColor={'#FFFFFF'} padding={'28px'} shadow={'lg'}>
          <Text fontWeight={'extrabold'} fontSize={'25px'}>Warehose</Text>
          <Breadcrumb spacing='8px' color={'#AAAAAA'} separator={<ChevronRightIcon color='gray.500' />}>
            <BreadcrumbItem>
              <BreadcrumbLink href='/warehouses'>Warehouse</BreadcrumbLink>
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
            </Box>
          </Flex>
        </Box>
        <Box padding={'22px'} margin={'20px'} bgColor={'#FFFFFF'} pb={'90px'}>
          <Text mt={'20px'} fontWeight={'bold'} fontSize={'25px'}>Product List</Text>
          <Flex mb="5">
            <Button
              colorScheme="blue"
              leftIcon={<FiPlusCircle />}
              onClick={onOpenAdd}
            >
              Add Item
            </Button>
          </Flex>
          <Modal onClose={onCloseAdd} isOpen={isOpenAdd} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add Item</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel>Item</FormLabel>
                  <Select ref={selectedItemRef} placeholder='Select option' mb={3}>
                    {
                      itemList?.map((product) =>
                      (
                        <option value={product.id} key={product.id}>{product.title}</option>
                      )
                      )
                    }
                  </Select>
                  <FormLabel>Quantity</FormLabel>
                  <Input ref={newItemQuantityRef} placeholder='Quantity' />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button mr={3} colorScheme="teal" onClick={(e) => handleAddItem()}>Submit</Button>
                <Button onClick={onCloseAdd}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Table>
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Title</Th>
                <Th>SKU</Th>
                <Th>Quantity</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                items?.map((item, idx) => (
                  <Tr key={idx}>
                    <Td>{idx + 1}</Td>
                    <Td>{item.title}</Td>
                    <Td>{item.sku}</Td>
                    <Td>{item.Item_Warehouse.quantity}</Td>
                    <Td>
                      <Menu>
                        <MenuButton
                          as={Button}
                          size="md"
                          colorScheme="messenger"
                          variant="outline"
                          rightIcon={<FaCaretDown />}
                        >
                          Action
                        </MenuButton>
                        <MenuList>
                          <MenuItem onClick={onOpen} icon={<FaRegEdit />}>Edit Quantity</MenuItem>
                          <Modal onClose={onClose} isOpen={isOpen} isCentered>
                            <ModalOverlay />
                            <ModalContent>
                              <ModalHeader>Edit Quantity</ModalHeader>
                              <ModalCloseButton />
                              <ModalBody>
                                <FormControl>
                                  <FormLabel>Quantity</FormLabel>
                                  <Input ref={quantityRef} placeholder='Quantity' />
                                </FormControl>
                              </ModalBody>
                              <ModalFooter>
                                <Button mr={3} colorScheme="teal" onClick={(e) => handleUpdateQuantity(item.id)}>Submit</Button>
                                <Button onClick={onClose}>Close</Button>
                              </ModalFooter>
                            </ModalContent>
                          </Modal>
                        </MenuList>
                      </Menu>
                    </Td>
                  </Tr>
                ))
              }
            </Tbody>
          </Table>

        </Box>
      </Box>
    </>)
};

export default WarehouseDetail;