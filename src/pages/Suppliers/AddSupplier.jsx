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
import { addSupplier } from '../../fetching/supplier';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CustomHeader from '../../components/Boxtop';

const AddSupplier = () => {
    const [supplier, setSupplier] = useState({
        company_name: '',
        address: '',
        email: '',
        zip_code: '',
    });

    const toast = useToast();
    const navigate = useNavigate();

    const handleFormChange = (e) => {
        setSupplier({
            ...supplier,
            [e.target.name]: e.target.value,
        });
    };

    const handleFormSubmit = async () => {
        try {
            if (!supplier.company_name || !supplier.email || !supplier.zip_code || !supplier.address) {
                toast({
                    title: 'All fields are required.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }

            await addSupplier(
                supplier.company_name,
                supplier.address,
                supplier.email,
                supplier.zip_code,
            );

            toast({
                title: 'Supplier added successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            navigate('/suppliers');
        } catch (error) {
            console.error('Error adding supplier:', error.message);
            toast({
                title: 'Error adding supplier.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <Navbar />
            <Box bg="gray.200" pb="5">
            <CustomHeader title={'Supplier'} subtitle={'Add Supplier'} href={'suppliers'} subhref={`addsuppliers`} />

                <Container maxW="145ch" bg="white" p="4" borderRadius="md" boxShadow="md" mt="5">
                    <Flex direction="column" m="5">
                        <FormControl mb="4" isRequired>
                            <FormLabel>Company Name</FormLabel>
                            <Input
                                name="company_name"
                                placeholder="Company Name"
                                value={supplier.company_name}
                                onChange={handleFormChange}
                            />
                        </FormControl>

                        <FormControl mb="4" isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                name="email"
                                placeholder="Email"
                                value={supplier.email}
                                onChange={handleFormChange}
                            />
                        </FormControl>

                        <FormControl mb="4" isRequired>
                            <FormLabel>Address</FormLabel>
                            <Input
                                name="address"
                                placeholder="Address"
                                value={supplier.address}
                                onChange={handleFormChange}
                            />
                        </FormControl>

                        <FormControl mb="4" isRequired>
                            <FormLabel>Zip Code</FormLabel>
                            <Input
                                name="zip_code"
                                placeholder="Zip Code"
                                value={supplier.zip_code}
                                onChange={handleFormChange}
                            />
                        </FormControl>

                        <Flex justifyContent="center" alignItems="center">
                            <Button size="md" colorScheme="linkedin" onClick={handleFormSubmit}>
                                Add Supplier
                            </Button>
                        </Flex>
                    </Flex>
                </Container>
            </Box>
            <Footer />
        </>
    );
};

export default AddSupplier;