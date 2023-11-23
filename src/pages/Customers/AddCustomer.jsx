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
import { addCustomer } from '../../fetching/customer';
import { useNavigate } from 'react-router-dom';

const AddCustomer = () => {
    const [customer, setCustomer] = useState({
        name: '',
        address: '',
        phone_number: '',
        email: '',
    });

    const toast = useToast();
    const navigate = useNavigate();

    const handleFormChange = (e) => {
        setCustomer({
            ...customer,
            [e.target.name]: e.target.value,
        });
    };

    const handleFormSubmit = async () => {
        try {
            if (!customer.name || !customer.email || !customer.phone_number || !customer.address) {
                toast({
                    title: 'All fields are required.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }

            // Call the API function with customer details
            await addCustomer(
                customer.name,
                customer.address,
                customer.phone_number,
                customer.email
            );

            toast({
                title: 'Customer added successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            navigate('/customers');
        } catch (error) {
            console.error('Error adding customer:', error.message);
            toast({
                title: 'Error adding customer.',
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
                    Customer List
                </Heading>
                <Text fontSize="sm" color="gray.500">
                    Customer {'>'} Add Customer
                </Text>
            </Container>

            <Container maxW="145ch" bg="white" p="4" borderRadius="md" boxShadow="md">
                <Flex direction="column" m="5">
                    <FormControl mb="4" isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input
                            name="name"
                            placeholder="Name"
                            value={customer.name}
                            onChange={handleFormChange}
                        />
                    </FormControl>

                    <FormControl mb="4" isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input
                            name="email"
                            placeholder="Email"
                            value={customer.email}
                            onChange={handleFormChange}
                        />
                    </FormControl>

                    <FormControl mb="4" isRequired>
                        <FormLabel>Phone Number</FormLabel>
                        <Input
                            name="phone_number"
                            placeholder="Phone Number"
                            value={customer.phone_number}
                            onChange={handleFormChange}
                        />
                    </FormControl>

                    <FormControl mb="4" isRequired>
                        <FormLabel>Address</FormLabel>
                        <Input
                            name="address"
                            placeholder="Address"
                            value={customer.address}
                            onChange={handleFormChange}
                        />
                    </FormControl>

                    <Flex justifyContent="center" alignItems="center">
                        <Button size="md" colorScheme="messenger" onClick={handleFormSubmit}>
                            Add Customer
                        </Button>
                    </Flex>
                </Flex>
            </Container>
        </Box>
    );
};

export default AddCustomer;
