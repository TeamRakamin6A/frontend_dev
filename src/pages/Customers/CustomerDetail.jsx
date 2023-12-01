import { useEffect, useState } from 'react';
import {
  Box,
  Container,
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
import { useParams, useNavigate } from 'react-router-dom';
import { getCustomerById, updateCustomer, deleteCustomer } from '../../fetching/customer';
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";
import CustomHeader from '../../components/Boxtop';
import Footer from "../../components/Footer";

const CustomerDetail = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  // State dan fungsi untuk update modal
  const {
    isOpen: isUpdateModalOpen,
    onOpen: onOpenUpdateModal,
    onClose: onCloseUpdateModal,
  } = useDisclosure();
  const [updatedCustomer, setUpdatedCustomer] = useState({
    name: '',
    address: '',
    phone_number: '',
    email: '',
  });

  // State dan fungsi untuk delete modal
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();

  useEffect(() => {
    setLoading(true)
    const fetchCustomerDetail = async () => {
      try {
        const customerDetail = await getCustomerById(id);
        setCustomer(customerDetail.data);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching customer detail:', error.message);
        toast({
          title: 'Error fetching customer detail.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchCustomerDetail();
  }, [id, toast]);

  const handleBack = () => {
    navigate('/customers');
  };

  // Fungsi untuk menangani perubahan pada form update
  const handleUpdateFormChange = (e) => {
    setUpdatedCustomer({
      ...updatedCustomer,
      [e.target.name]: e.target.value,
    });
  };

  // Fungsi untuk menangani submit form update
  const handleUpdateFormSubmit = async () => {
    setLoading(true)
    try {
      await updateCustomer(
        id,
        updatedCustomer.name,
        updatedCustomer.address,
        updatedCustomer.phone_number,
        updatedCustomer.email,
      );

      // Refresh data customer setelah update
      const updatedCustomerData = await getCustomerById(id);
      setCustomer(updatedCustomerData.data);
      setLoading(false)

      onCloseUpdateModal();

      toast({
        title: 'Customer updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating customer:', error.message);
      toast({
        title: 'Error updating customer.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Fungsi untuk menangani delete customer
  const handleDeleteCustomer = async () => {
    try {
      await deleteCustomer(id);

      // Redirect ke halaman customer list setelah berhasil delete
      navigate('/customers');

      toast({
        title: 'Customer deleted successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting customer:', error.message);
      toast({
        title: 'Error deleting customer.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Set data formulir update saat tombol "Update" ditekan
  const handleUpdateButtonClick = () => {
    setUpdatedCustomer({
      name: customer.name,
      address: customer.address,
      phone_number: customer.phone_number,
      email: customer.email,
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
        <CustomHeader title={'Customer'} subtitle={'Customer Detail'} href={'customers'} subhref={`customers/${id}`} />

        <Container maxW="145ch" bg="white" p="4" borderRadius="md" boxShadow="md" mt={'30px'}>
          <Flex direction="column" m="5">
            <FormControl mb="4" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                readOnly
                name="name"
                placeholder="Name"
                value={customer.name}
              />
            </FormControl>

            <FormControl mb="4" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                readOnly
                name="email"
                placeholder="Email"
                value={customer.email}
              />
            </FormControl>

            <FormControl mb="4" isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input
                readOnly
                name="phone_number"
                placeholder="Phone Number"
                value={customer.phone_number}
              />
            </FormControl>

            <FormControl mb="4" isRequired>
              <FormLabel>Address</FormLabel>
              <Input
                readOnly
                name="address"
                placeholder="Address"
                value={customer.address}
              />
            </FormControl>

            <Flex justify="space-between">
              <Button colorScheme="linkedin" onClick={handleBack}>
                Back To Customers
              </Button>

              <Flex>
                <Button colorScheme="green" mr={2} onClick={handleUpdateButtonClick}>
                  Update Customer
                </Button>

                <Button colorScheme="red" onClick={onOpenDeleteModal}>
                  Delete Customer
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Container>

        {/* Modal Update */}
        <Modal isOpen={isUpdateModalOpen} onClose={onCloseUpdateModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Customer</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb="4" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  placeholder="Name"
                  value={updatedCustomer.name}
                  onChange={handleUpdateFormChange}
                />
              </FormControl>

              <FormControl mb="4" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  placeholder="Email"
                  value={updatedCustomer.email}
                  onChange={handleUpdateFormChange}
                />
              </FormControl>

              <FormControl mb="4" isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  name="phone_number"
                  placeholder="Phone Number"
                  value={updatedCustomer.phone_number}
                  onChange={handleUpdateFormChange}
                />
              </FormControl>

              <FormControl mb="4" isRequired>
                <FormLabel>Address</FormLabel>
                <Input
                  name="address"
                  placeholder="Address"
                  value={updatedCustomer.address}
                  onChange={handleUpdateFormChange}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              {/* Tombol "Update" di dalam modal */}
              <Button colorScheme="green" mr={3} onClick={handleUpdateFormSubmit}>
                Update
              </Button>
              {/* Tombol "Cancel" di dalam modal */}
              <Button colorScheme="red" onClick={onCloseUpdateModal}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Modal Delete */}
        <Modal isOpen={isDeleteModalOpen} onClose={onCloseDeleteModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Customer</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* Konfirmasi penghapusan */}
              Are you sure you want to delete this customer?
            </ModalBody>
            <ModalFooter>
              {/* Tombol "Delete" di dalam modal */}
              <Button colorScheme="red" mr={3} onClick={handleDeleteCustomer}>
                Delete
              </Button>
              {/* Tombol "Cancel" di dalam modal */}
              <Button onClick={onCloseDeleteModal}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
      <Footer />
    </>
  );
};

export default CustomerDetail;
