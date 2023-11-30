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
import { getSupplierById, updateSupplier, deleteSupplier } from '../../fetching/supplier';
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";
import Footer from "../../components/Footer";

const SupplierDetail = () => {
  const { id } = useParams();
  const [supplier, setSupplier] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const {
    isOpen: isUpdateModalOpen,
    onOpen: onOpenUpdateModal,
    onClose: onCloseUpdateModal,
  } = useDisclosure();

  const [updatedSupplier, setUpdatedSupplier] = useState({
    company_name: '',
    address: '',
    email: '',
    zip_code: '',
  });

  const {
    isOpen: isDeleteModalOpen,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();

  useEffect(() => {
    setLoading(true);
    const fetchSupplierDetail = async () => {
      try {
        const supplierDetail = await getSupplierById(id);
        setSupplier(supplierDetail.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching supplier detail:', error.message);
        toast({
          title: 'Error fetching supplier detail.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchSupplierDetail();
  }, [id, toast]);

  const handleBack = () => {
    navigate('/suppliers');
  };

  const handleUpdateFormChange = (e) => {
    setUpdatedSupplier(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };


  const handleUpdateFormSubmit = async () => {
    try {
      await updateSupplier(
        id,
        updatedSupplier.company_name,
        updatedSupplier.address,
        updatedSupplier.email,
        updatedSupplier.zip_code,
      );

      const updatedSupplierData = await getSupplierById(id);
      setSupplier(updatedSupplierData.data);

      onCloseUpdateModal();

      toast({
        title: 'Supplier updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating supplier:', error.message);
      toast({
        title: 'Error updating supplier.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteSupplier = async () => {
    try {
      await deleteSupplier(id);

      navigate('/suppliers');

      toast({
        title: 'Supplier deleted successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting supplier:', error.message);
      toast({
        title: 'Error deleting supplier.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateButtonClick = () => {
    setUpdatedSupplier({
      company_name: supplier.company_name,
      address: supplier.address,
      email: supplier.email,
      zip_code: supplier.zip_code,
    });
    onOpenUpdateModal();
  };

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <>
      <Navbar />
      <Box bg="gray.200" pb="5">
        <Container maxW="" mb="5" bg="white" p="4" boxShadow="md">
          <Heading as="h1" fontSize="xl">
            Supplier Detail
          </Heading>
          <Flex align="center">
            <Link to="/suppliers">
              <Text fontSize="sm" color="gray.500" mr="1">
                Supplier
              </Text>
            </Link>
            <Text fontSize="sm" color="gray.500">
              {'>'} Supplier Detail
            </Text>
          </Flex>
        </Container>

        <Container maxW="145ch" bg="white" p="4" borderRadius="md" boxShadow="md">
          <Flex direction="column" m="5">
            <FormControl mb="4">
              <FormLabel>Company Name</FormLabel>
              <Input
                readOnly
                name="company_name"
                placeholder="Company Name"
                value={supplier.company_name}
              />
            </FormControl>

            <FormControl mb="4">
              <FormLabel>Email</FormLabel>
              <Input
                readOnly
                name="email"
                placeholder="Email"
                value={supplier.email}
              />
            </FormControl>


            <FormControl mb="4">
              <FormLabel>Address</FormLabel>
              <Input
                readOnly
                name="address"
                placeholder="Address"
                value={supplier.address}
              />
            </FormControl>

            <FormControl mb="4">
              <FormLabel>Zip Cde</FormLabel>
              <Input
                readOnly
                name="zip_code"
                placeholder="Zip Code"
                value={supplier.zip_code}
              />
            </FormControl>

            <Flex justify="space-between">
              <Button colorScheme="blue" onClick={handleBack}>
                Back To Suppliers
              </Button>

              <Flex>
                <Button colorScheme="teal" mr={2} onClick={handleUpdateButtonClick}>
                  Update Supplier
                </Button>

                <Button colorScheme="red" onClick={onOpenDeleteModal}>
                  Delete Supplier
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Container>

        {/* Modal Update */}
        <Modal isOpen={isUpdateModalOpen} onClose={onCloseUpdateModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Supplier</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb="4" isRequired>
                <FormLabel>Company Name</FormLabel>
                <Input
                  name="company_name"
                  placeholder="Company Name"
                  value={updatedSupplier.company_name}
                  onChange={handleUpdateFormChange}
                />
              </FormControl>

              <FormControl mb="4" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  placeholder="Email"
                  value={updatedSupplier.email}
                  onChange={handleUpdateFormChange}
                />
              </FormControl>

              <FormControl mb="4" isRequired>
                <FormLabel>Address</FormLabel>
                <Input
                  name="address"
                  placeholder="Address"
                  value={updatedSupplier.address}
                  onChange={handleUpdateFormChange}
                />
              </FormControl>

              <FormControl mb="4" isRequired>
                <FormLabel>Zip Code</FormLabel>
                <Input
                  name="zip_code"
                  placeholder="Zip Code"
                  value={updatedSupplier.zip_code}
                  onChange={handleUpdateFormChange}
                />
              </FormControl>

            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleUpdateFormSubmit}>
                Update
              </Button>
              <Button colorScheme="red" onClick={onCloseUpdateModal}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Modal Delete */}
        <Modal isOpen={isDeleteModalOpen} onClose={onCloseDeleteModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Supplier</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Are you sure you want to delete this supplier?
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={handleDeleteSupplier}>
                Delete
              </Button>
              <Button onClick={onCloseDeleteModal}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
      <Footer />
    </>
  );
};

export default SupplierDetail;