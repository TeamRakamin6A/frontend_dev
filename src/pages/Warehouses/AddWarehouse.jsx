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
import { createWarehouse } from '../../fetching/warehouse';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import CustomHeader from '../../components/Boxtop';

const CreateWarehouse = () => {
    const [formData, setFormData] = useState({
        title: '',
        address: ''
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

        if (!formData.title || !formData.address) {
            toast({
                title: "Error",
                description: 'All fields are required.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            const res = await createWarehouse(
                formData.title,
                formData.address,
            );

            toast({
                title: 'Success',
                description: res.message || 'Warehouse Created Successfully',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            navigate('/warehouses');
        } catch (error) {
            console.error('Error add Warehouse:', error.message);
            toast({
                title: 'Error',
                description: error.response.data.message || 'Error add Warehouse.',
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
                <CustomHeader title={'Warehouse'} subtitle={'Add Warehouse'} href={'warehouses'} subhref={'warehouses/addwarehouse'} />
                <Container maxW="145ch" bg="white" p="4" borderRadius="md" boxShadow="md">
                    <Flex direction="column" m="5">
                        <FormControl mb="4" isRequired>
                            <FormLabel>Title</FormLabel>
                            <Input
                                name="title"
                                placeholder="Title"
                                value={formData.title}
                                onChange={handleFormChange}
                            />
                        </FormControl>

                        <FormControl mb="4" isRequired>
                            <FormLabel>Address</FormLabel>
                            <Input
                                name="address"
                                placeholder="Address Warehouse"
                                value={formData.address}
                                onChange={handleFormChange}
                            />
                        </FormControl>
                        <Button colorScheme="blue" onClick={handleFormSubmit}>
                            Add Warehouese
                        </Button>
                    </Flex>
                </Container>
            </Box>
        </>

    );
};

export default CreateWarehouse;
