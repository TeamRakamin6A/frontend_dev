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
import CustomHeader from '../../components/Boxtop';

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
          title: 'Error',
          description: error.message,
          position: 'top',
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
      if (!updatedCategory.title) {
        toast({
          title: 'Title is required.',
          status: 'error',
          position: 'top',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const updateRes = await updateCategorie(
        id,
        updatedCategory.title,
      );

      onCloseUpdateModal();
      toast({
        title: 'Success',
        description: updateRes.message,
        status: 'success',
        position: 'top',
        duration: 3000,
        isClosable: true,
      });

      const updatedCategoryData = await getCategorieById(id);
      setCategory(updatedCategoryData.data);

    } catch (error) {
      console.error('Error updating category:', error.message);
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


  const handleDeleteCategory = async () => {
    try {
      const deleteRes = await deleteCategorie(id);

      toast({
        title: 'Success',
        description: deleteRes.message,
        status: 'success',
        position: 'top',
        duration: 3000,
        isClosable: true,
      });

      navigate('/categories');

    } catch (error) {
      console.error('Error deleting category:', error.message);
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        position: "top",
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
        <CustomHeader title={'Category'} subtitle={'Detail Category'} href={'categories'} subhref={`categories/${id}`} />

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
              <Button colorScheme="linkedin" onClick={handleBack}>
                Back To Categories
              </Button>

              <Flex>
                <Button colorScheme="green" mr={2} onClick={handleUpdateButtonClick}>
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
              <Button colorScheme="green" mr={3} onClick={handleUpdateFormSubmit}>
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
