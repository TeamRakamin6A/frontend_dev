import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Button,
  Input,
  useToast,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCategorieById, updateCategorie, deleteCategorie } from '../../fetching/category'; 
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const CategoryDetail = () => {
  const { id } = useParams();
  const [category, setCategory] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();

  
  const {
    isOpen: isUpdateModalOpen,
    onOpen: onOpenUpdateModal,
    onClose: onCloseUpdateModal,
  } = useDisclosure();
  const [updatedCategory, setUpdatedCategory] = useState({
    title: '',
  });

  
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();

  useEffect(() => {
    const fetchCategoryDetail = async () => {
      try {
        const categoryDetail = await getCategorieById(id);
        setCategory(categoryDetail.data);
      } catch (error) {
        console.error('Error fetching category detail:', error.message);
        toast({
          title: 'Error fetching category detail.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchCategoryDetail();
  }, [id, toast]);

  const handleBack = () => {
    navigate('/categories');
  };

  
  const handleUpdateFormChange = (e) => {
    setUpdatedCategory({
      ...updatedCategory,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleUpdateFormSubmit = async () => {
    try {
      await updateCategorie(
        id,
        updatedCategory.title,
      );

      
      const updatedCategoryData = await getCategorieById(id);
      setCategory(updatedCategoryData.data);

      onCloseUpdateModal();

      toast({
        title: 'Category updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating category:', error.message);
      toast({
        title: 'Error updating category.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  
  const handleDeleteCategory = async () => {
    try {
      await deleteCategorie(id);

      
      navigate('/categories');

      toast({
        title: 'Category deleted successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting category:', error.message);
      toast({
        title: 'Error deleting category.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  
  const handleUpdateButtonClick = () => {
    setUpdatedCategory({
      title: category.title,
    });
    onOpenUpdateModal();
  };


  return (
    <>
      <Navbar />
      <Box minH="79vh" bg="gray.200" pb="5">
        <Container maxW="" mb="5" bg="white" p="4" boxShadow="md">
          <Heading as="h1" fontSize="xl">
            Category Detail
          </Heading>
          <Flex align="center">
            <Link to="/categories">
              <Text fontSize="sm" color="gray.500" mr="1">
                Category
              </Text>
            </Link>
            <Text fontSize="sm" color="gray.500">
              {'>'} Category Detail
            </Text>
          </Flex>
        </Container>

        <Container maxW="145ch" bg="white" p="4" borderRadius="md" boxShadow="md" mt="100">
          <Flex direction="column" m="5">
            <FormControl mb="4" isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                readOnly
                name="title"
                placeholder="Title"
                value={category.title}
              />
            </FormControl>

            <Flex justify="space-between">
              <Button colorScheme="blue" onClick={handleBack}>
                Back To Categories
              </Button>

              <Flex>
                <Button colorScheme="teal" mr={2} onClick={handleUpdateButtonClick}>
                  Update Category
                </Button>

                <Button colorScheme="red" onClick={onOpenDeleteModal}>
                  Delete Category
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Container>

        <Modal isOpen={isUpdateModalOpen} onClose={onCloseUpdateModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Category</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb="4" isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  name="title"
                  placeholder="Title"
                  value={updatedCategory.title}
                  onChange={handleUpdateFormChange}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleUpdateFormSubmit}>
                Update
              </Button>
              <Button colorScheme="red" onClick={onCloseUpdateModal}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal isOpen={isDeleteModalOpen} onClose={onCloseDeleteModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Category</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Are you sure you want to delete this category?
            </ModalBody>
            <ModalFooter>

              <Button colorScheme="red" mr={3} onClick={handleDeleteCategory}>
                Delete
              </Button>

              <Button onClick={onCloseDeleteModal}>
                Cancel
              </Button>

            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
      <Footer />
    </>
  );
};

export default CategoryDetail;
