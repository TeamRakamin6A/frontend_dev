import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
    Button,
    Input,
    Select,
    useToast,
    Box,
    Flex,
    Heading,
    SimpleGrid,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Text
} from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import {
    createOrder
} from "../../fetching/order";
import { getAllWarehouses } from "../../fetching/warehouse";
import { getAllItems } from "../../fetching/item";
import { getAllCustomers } from "../../fetching/customer";
import CustomHeader from "../../components/Boxtop";
import Loading from "../../components/Loading";
import convertPrice from "../../lib/convertPrice";
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';

const CreateOrder = () => {
    const toast = useToast();

    const [warehouses, setWarehouses] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [items, setItems] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [itemList, setItemList] = useState([])
    const [loading, setLoading] = useState(false)
    const selectedItemRef = useRef({})
    const newItemQuantityRef = useRef(0)

    // Form Submit
    const [customerId, setCustomerId] = useState(0);
    const [warehouseId, setWarehouseId] = useState(0);
    const [status, setStatus] = useState("pending");
    const [totalPrice, setTotalPrice] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        fetchAll();
    }, []);

    const fetchAll = async () => {
        try {
            const responseWarehouses = await getAllWarehouses();
            setWarehouses(responseWarehouses.data);
            const responseCustomers = await getAllCustomers(1, 100, "");
            setCustomers(responseCustomers.items);
            const responseItems = await getAllItems(1, 100, "", []);
            setItems(responseItems.data.items);
            setLoading(false)
        } catch (err) {
            console.log(err)
        }
    }

    const handleCreateOrder = async () => {
        try {

            const itemPayload = itemList.map((currentElement) => {
                return {
                    id: currentElement.item.id,
                    quantity: currentElement.quantity,
                    price_item: +currentElement.item.price
                }
            })
            const payload = {
                invoice: +1,
                total_price: getTotalPrice(),
                customer_id: customerId,
                warehouse_id: warehouseId,
                status: status,
                items: itemPayload
            }

            await createOrder(payload)
            navigate("/orders")
            toast({
                title: "Success",
                description: "Order created successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (err) {
            toast({
                title: "Error",
                description: "Failed to create order",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    }

    const addNewItem = async () => {
        const foundItem = items.find((e) => e.id === +selectedItemRef.current.value)
        try {
            let itemObject = {
                item: foundItem,
                quantity: +newItemQuantityRef.current.value,
            }
            const updatedItems = [...itemList]
            // find existing item
            if (itemList.length !== 0) {
                let existingId = itemList.findIndex((e) => e.item.id === foundItem.id)
                if (existingId !== -1) {
                    // update item
                    updatedItems[existingId] = { ...updatedItems[existingId], quantity: +newItemQuantityRef.current.value }
                    setItemList(updatedItems)
                } else {
                    // add new item
                    setItemList([...itemList, itemObject])
                }
            } else {
                // Create new item
                setItemList([...itemList, itemObject])
            }
            setTotalPrice(getTotalPrice())
            onClose();
        } catch (err) {
            console.log(err);
        }
    }

    if (loading) {
        return <Loading />
    }

    const getTotalPrice = () => {

        const sum = itemList.reduce((accumulator, currentValue) => {
            return accumulator + (+currentValue.item.price * +currentValue.quantity)
        }, 0)

        return sum;
    }

    const changeWarehouse = (id) => {
        setWarehouseId(id),
            setItemList([])
    }

    const ItemTable = () => {
        return (
            <>
                <Table mb={30}>
                    <Thead>
                        <Tr>
                            <Th>No</Th>
                            <Th>Product</Th>
                            <Th>Price</Th>
                            <Th>Quantity</Th>
                            <Th>Total Price</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {itemList?.map((el, idx) => (
                            <Tr key={idx}>
                                <Td>{idx + 1}</Td>
                                <Td>{el.item.title}</Td>
                                <Td>{convertPrice(el.item.price)}</Td>
                                <Td>{el.quantity}</Td>
                                <Td>{convertPrice(+el.item.price * +el.quantity)}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
                <Box>
                    <Text align={"right"}>Total Price {convertPrice(getTotalPrice())}</Text>
                </Box>
            </>
        )
    }

    const findWarehouseById = () => {
        return warehouses.find((w) => w.id === +warehouseId)
    }

    const ComponentItem = () => {
        return (
            <>
                <Button colorScheme="teal" onClick={onOpen} mb={10}>Add Item</Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Add New Item</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl>
                                <FormLabel>Item</FormLabel>
                                <Select ref={selectedItemRef} placeholder='Select option' mb={3}>
                                    {
                                        findWarehouseById().Items?.map((product) =>
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
                            <Button colorScheme='teal' onClick={addNewItem} mr={4}>Submit</Button>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        )
    }

    return (
        <div style={{ backgroundColor: "#f8f8f8", minHeight: "100vh" }}>
            <Navbar />
            <CustomHeader title="Orders" subtitle="Add Orders" />
            <Box bg="white" m="40px" minHeight={"fit-content"}>
                <Heading ml="60px" pt="40px" pb="20px" fontSize={'22px'}>
                    Add Order
                </Heading>
                <Box display="flex">
                    <Box flex="1" mx="60px" pt="20px">
                        <SimpleGrid columns={2} spacing={10} marginBottom={30}>
                            <Box style={{ fontSize: "14px", fontWeight: "bold", }}>
                                Customer
                                <Select
                                    name="customer_id"
                                    fontSize="14px"
                                    height="40px"
                                    onChange={(e) => setCustomerId(+(e.target.value))}
                                    required
                                >
                                    <option value="">
                                        Select a customer
                                    </option>
                                    {customers.map((customer) => (
                                        <option key={customer.id} value={customer.id}>
                                            {customer.name}
                                        </option>
                                    ))}
                                </Select>
                            </Box>
                            <Box style={{ fontSize: "14px", fontWeight: "bold", }}>
                                Warehouse
                                <Select
                                    name="warehouse_id"
                                    fontSize="14px"
                                    height="40px"
                                    value={warehouseId}
                                    onChange={(e) => changeWarehouse(+(e.target.value))}
                                    required
                                >
                                    <option value="">
                                        Select a warehouse
                                    </option>
                                    {warehouses.map((warehouse) => (
                                        <option key={warehouse.id} value={warehouse.id}>
                                            {warehouse.title}
                                        </option>
                                    ))}
                                </Select>
                            </Box>
                            <Box style={{ fontSize: "14px", fontWeight: "bold", }}>
                                Status
                                <Select
                                    name="status"
                                    fontSize="14px"
                                    height="40px"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    required
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Success">Success</option>
                                </Select>
                            </Box>
                        </SimpleGrid>
                        <Box>
                            {warehouseId != 0 ? <ComponentItem /> : ''}

                            {itemList.length !== 0 ? <ItemTable /> : ""}
                            <Flex justifyContent="flex-start" >
                                <Button
                                    type="button"

                                    colorScheme="messenger"
                                    fontSize="md"
                                    mr={5}
                                    p={7}
                                    onClick={handleCreateOrder}
                                >
                                    Add Orders
                                </Button>
                                <Link to="/orders">
                                    <Button variant="outline" colorScheme="blue" p={7}>
                                        Back to List Orders
                                    </Button>
                                </Link>
                            </Flex>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div >

    );
};
export default CreateOrder;