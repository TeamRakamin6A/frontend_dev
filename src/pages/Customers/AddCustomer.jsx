import { useState } from 'react';
import {
    Box,
    Container,
    Button,
    Input,
    Flex,
    useToast,
    FormControl,
    FormLabel,
} from '@chakra-ui/react';
import { addCustomer } from '../../fetching/customer';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/Navbar";
import CustomHeader from '../../components/Boxtop';
import Footer from "../../components/Footer";

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
            const addRes = await addCustomer(
                customer.name,
                customer.address,
                customer.phone_number,
                customer.email
            );

            toast({
                title: 'Success',
                description: addRes.message || 'Customer added successfully',
                position: 'top',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            navigate('/customers');
        } catch (error) {
            console.error('Error adding customer:', error.message);
            toast({
                title: 'Error',
                description: error.message,
                position: 'top',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <Navbar />
            <Box bg="gray.200" minH="100vh" pb="5">
                <CustomHeader title={'Customer'} subtitle={'Add Customer'} href={'customers'} subhref={'customers/addcustomers'} />

                <Container maxW="145ch" bg="white" p="4" borderRadius="md" boxShadow="md" mt="5">
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
                            <Button size="md" colorScheme="linkedin" onClick={handleFormSubmit}>
                                Add Customer
                            </Button>
                        </Flex>
                    </Flex>
                </Container>
            </Box>
            <Footer />
        </>
    );
};

export default AddCustomer;
