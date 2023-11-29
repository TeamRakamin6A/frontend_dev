import { json, useParams } from "react-router-dom";
import { getWarehouseById, updateQuantity, addItemToWarehouse, getAllWarehouses, moveQuantityToWarehouse } from "../../fetching/warehouse";
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
  const [AllWarehouse, setAllWarehouse] = useState([])
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenAdd, onOpen: onOpenAdd, onClose: onCloseAdd } = useDisclosure();
  const { isOpen: isOpenMove, onOpen: onOpenMove, onClose: onCloseMove } = useDisclosure();
  const quantityRef = useRef(0)
  const newItemQuantityRef = useRef(0)
  const toast = useToast();
  const [itemList, setItemList] = useState([]);
  const [itemWarehouse, setItemWarehouse] = useState([]);
  const [itemMap, setItemMap] = useState([]);
  const selectedItemRef = useRef(0);
  const selectedWarehouseRef = useRef(0);

  const fetchWarehouseDetail = async () => {
    try {
      const res = await getWarehouseById(+id)
      const resAllWarehouse = await getAllWarehouses(1, 100, "")
      const itemResponse = await getAllItems(1, 100, "", []);
      setAllWarehouse(resAllWarehouse.data)
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
    setItemWarehouse(itemWarehouse)

    const dataItem = warehouse.Items ? warehouse.Items.map(item => item.title) : []
    setItemMap(dataItem)
  }, [isOpenMove])


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

  const handleWarehouseChange = async (e) => {
    try {
      const selectedValue = e.target.value;
      const res = await getWarehouseById(selectedValue);
      setItemWarehouse(res.Items)
    } catch (error) {
      console.log(error);
    }

  }

  const handleMoveItem = async () => {
    try {
      console.log(selectedWarehouseRef.current.value, "<<<<<<<<<<<<< SELECTED WAREHOUSE")
      console.log(selectedItemRef.current.value, "<<<<<<<<<<<<< SELECTED ITEM")
      console.log(newItemQuantityRef.current.value, "<<<<<<<<<<<<< NEW ITEM")
      const payload = {
        item_id: +selectedItemRef.current.value,
        initial_warehouse_id: warehouse.id,
        stock: +newItemQuantityRef.current.value,
        destination_warehouse_id: +selectedWarehouseRef.current.value
      }
      console.log(payload, "<<<<<<<<< PAYLOAD");

      const res = await moveQuantityToWarehouse(payload)
      console.log(res);
      toast({
        title: 'Success',
        description: res.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      await fetchWarehouseDetail();
      onCloseMove()

    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description: 'asdaaaaaa',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
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
              mr={'20px'}
            >
              Add Item
            </Button>
            <Button
              colorScheme="blue"
              leftIcon={<FiPlusCircle />}
              onClick={onOpenMove}
            >
              Move Quantity
            </Button>
          </Flex>
          <Box>
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
            {/* move quantity */}
            <Modal onClose={onCloseMove} isOpen={isOpenMove}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Move Quantity</ModalHeader>
                <ModalBody>
                  <FormControl>
                    <FormLabel>Destination Warehouse</FormLabel>
                    <Select ref={selectedWarehouseRef} onChange={handleWarehouseChange} placeholder='Select option' mb={3}>
                      {
                        AllWarehouse?.filter(wrhs => wrhs.id !== warehouse.id &&
                          wrhs.Items.some(item => itemMap.includes(item.title))
                        ).map(wrhs => (
                          <option value={wrhs.id} key={wrhs.id}>
                            {wrhs.title}
                          </option>
                        ))
                      }

                    </Select>
                    <FormLabel>Item</FormLabel>
                    <Select ref={selectedItemRef} placeholder='Select option' mb={3}>
                      {
                        itemWarehouse.filter(item => itemMap.includes(item.title)).map((itm) => (
                          <option value={itm.id} key={itm.id} >{itm.title}</option>
                        ))
                      }
                    </Select>
                  </FormControl>
                  <FormLabel>Quantity</FormLabel>
                  <Input ref={newItemQuantityRef} placeholder='Quantity' />
                </ModalBody>
                <ModalFooter>
                  <Button mr={3} colorScheme="teal" onClick={(e) => handleMoveItem()}>Submit</Button>
                  <Button onClick={onCloseMove}>Close</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>

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
      </Box >
    </>)
};

export default WarehouseDetail;