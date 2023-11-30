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
import { addCategorie } from '../../fetching/category'; 
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from "../../components/Footer";

const AddCategory = () => {
    const [category, setCategory] = useState({
        title: '',
    });

    const toast = useToast();
    const navigate = useNavigate();

    const handleFormChange = (e) => {
        setCategory({
            ...category,
            [e.target.name]: e.target.value,
        });
    };

    const handleFormSubmit = async () => {
        try {
            if (!category.title) {
                toast({
                    title: 'Title is required.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }

            await addCategorie(category.title);

            toast({
                title: 'Category added successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            navigate('/categories');
        } catch (error) {
            console.error('Error adding category:', error.message);
            toast({
                title: 'Error adding category.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <Navbar />
            <Box minH="79vh" bg="gray.200" pb="5">
                <Container maxW="" mb="5" bg="white" p="4" boxShadow="md">
                    <Heading as="h1" fontSize="xl">
                        Category List
                    </Heading>
                    <Flex align="center">
                        <Link to="/categories">
                            <Text fontSize="sm" color="gray.500" mr="1">
                                Category
                            </Text>
                        </Link>
                        <Text fontSize="sm" color="gray.500">
                            {'>'} Add Category
                        </Text>
                    </Flex>
                </Container>

                <Container maxW="145ch" bg="white" p="4" borderRadius="md" boxShadow="md" mt="100">
                    <Flex direction="column" m="5">
                        <FormControl mb="4" isRequired>
                            <FormLabel>Title</FormLabel>
                            <Input
                                name="title"
                                placeholder="Title"
                                value={category.title}
                                onChange={handleFormChange}
                            />
                        </FormControl>

                        <Flex justifyContent="center" alignItems="center">
                            <Button size="md" colorScheme="messenger" onClick={handleFormSubmit}>
                                Add Category
                            </Button>
                        </Flex>
                    </Flex>
                </Container>
            </Box>
            <Footer />
        </>
    );
};

export default AddCategory;
