import { useState } from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    Button,
    Input,
    Flex,
    useToast,
    FormControl,
    FormLabel,
} from '@chakra-ui/react';
import { createOrder } from '../../fetching/order';
import { useNavigate } from 'react-router-dom';

const CreateOrder = () => {
    const [formData, setFormData] = useState({
        invoice: '',
        total_price: '',
        warehouse_id: '',
        customer_id: '',
        status: '',
        item_id: '',
        quantity: '',
        price_item: ''
    });

    const toast = useToast();
    const navigate = useNavigate();

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFormSubmit = async () => {
        
        if (!formData.invoice || !formData.total_price || !formData.warehouse_id || !formData.customer_id || !formData.status  || !formData.item_id ||  !formData.quantity ||  !formData.price_item) {
            toast({
                title: 'All fields are required.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            await createOrder(
                formData.invoice,
                formData.total_price,
                formData.warehouse_id,
                formData.customer_id,
                formData.status,
                formData.item_id,
                formData.quantity,
                formData.price_item
            );

            toast({
                title: 'Order added successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            navigate('/orders');
        } catch (error) {
            console.error('Error Orders:', error.message);
            toast({
                title: 'Error Orders.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box bg="gray.200" minH="100vh" pb="5">
            <Container maxW="" mb="5" bg="white" p="4" boxShadow="md">
                <Heading as="h1" fontSize="xl">
                    Orders List
                </Heading>
                <Text fontSize="sm" color="gray.500">
                    Order {'>'} Add Order
                </Text>
            </Container>

            <Container maxW="145ch" bg="white" p="4" borderRadius="md" boxShadow="md">
                <Flex direction="column" m="5">
                    <FormControl mb="4" isRequired>
                        <FormLabel>Invoice</FormLabel>
                        <Input
                            name="invoice"
                            placeholder="Invoice"
                            value={formData.invoice}
                            onChange={handleFormChange}
                        />
                    </FormControl>

                    <FormControl mb="4" isRequired>
                        <FormLabel>Total Price</FormLabel>
                        <Input
                            name="total_price"
                            placeholder="Total Price"
                            value={formData.total_price}
                            onChange={handleFormChange}
                        />
                    </FormControl>

                    <FormControl mb="4" isRequired>
                        <FormLabel>Warehouse ID</FormLabel>
                        <Input
                            name="warehouse_id"
                            placeholder="Warehouse ID"
                            value={formData.warehouse_id}
                            onChange={handleFormChange}
                        />
                    </FormControl>

                    <FormControl mb="4" isRequired>
                        <FormLabel>Customers ID</FormLabel>
                        <Input
                            name="customer_id"
                            placeholder="Customer ID"
                            value={formData.customer_id}
                            onChange={handleFormChange}
                        />
                    </FormControl>

                    <FormControl mb="4" isRequired>
                        <FormLabel>Status</FormLabel>
                        <Input
                            name="status"
                            placeholder="Status Order"
                            value={formData.status}
                            onChange={handleFormChange}
                        />
                    </FormControl>

                    <FormControl mb="4" isRequired>
                        <FormLabel>Item ID</FormLabel>
                        <Input
                            name="item_id"
                            placeholder="Item ID"
                            value={formData.item_id}
                            onChange={handleFormChange}
                        />
                    </FormControl>

                    <FormControl mb="4" isRequired>
                        <FormLabel>Quantity</FormLabel>
                        <Input
                            name="quantity"
                            placeholder="Quantity"
                            value={formData.quantity}
                            onChange={handleFormChange}
                        />
                    </FormControl>

                    <FormControl mb="4" isRequired>
                        <FormLabel>Price Item</FormLabel>
                        <Input
                            name="price_item"
                            placeholder="Item Price"
                            value={formData.price_item}
                            onChange={handleFormChange}
                        />
                    </FormControl>

                    <Button colorScheme="blue" onClick={handleFormSubmit}>
                        Add Order
                    </Button>
                </Flex>
            </Container>
        </Box>
    );
};

export default CreateOrder;
