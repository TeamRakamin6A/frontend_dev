import { useState, useEffect } from 'react';
import {
  Box,
  Center,
  Container,
  Heading,
  Text,
  Button,
  Input,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { getAllCustomers, updateCustomer, deleteCustomer } from '../../fetching/customer';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState();
  const [selectedLimit, setSelectedLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const { isOpen: isUpdateModalOpen, onOpen: onOpenUpdateModal, onClose: onCloseUpdateModal } =
    useDisclosure();

  const { isOpen: isDeleteModalOpen, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } =
    useDisclosure();

  const toast = useToast();

  const [updateFormData, setUpdateFormData] = useState({
    id: null,
    name: '',
    address: '',
    phone_number: '',
    email: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const sortCustomersById = (customers) => {
    return customers.sort((a, b) => a.id - b.id);
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);

      try {
        const result = await getAllCustomers(currentPage, limit, searchTerm, filter);
        const sortedCustomers = sortCustomersById(result.items);
        setCustomers(sortedCustomers);
        setTotalPages(result.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching customers:', error.message);
        setLoading(false);
      }

      setLoading(false);

    };

    const debouncedFetchCustomers = debounce(fetchCustomers, 1000, true);

    if (searchTerm.trim() !== "") {
      debouncedFetchCustomers();
    } else {
      fetchCustomers();
    }

    return () => {
      clearTimeout(debouncedFetchCustomers.timeoutId);
    };
  }, [currentPage, limit, searchTerm, filter]);


  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleDeleteCustomer = async (customerId) => {
    setSelectedCustomerId(customerId);
    onOpenDeleteModal();
  };

  const handleDeleteSubmit = async () => {
    try {
      await deleteCustomer(selectedCustomerId);
      const result = await getAllCustomers(currentPage, limit, searchTerm, filter);
      setCustomers(result.items);
      onCloseDeleteModal();
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
  }

  const handleUpdateCustomer = (customerId) => {
    const selectedCustomer = customers.find((customer) => customer.id === customerId);
    setUpdateFormData({
      id: selectedCustomer.id,
      name: selectedCustomer.name,
      address: selectedCustomer.address,
      phone_number: selectedCustomer.phone_number,
      email: selectedCustomer.email,
    });
    setSelectedCustomerId(customerId);
    onOpenUpdateModal();
  };

  const handleUpdateFormChange = (e) => {
    setUpdateFormData({
      ...updateFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateFormSubmit = async () => {
    try {
      await updateCustomer(
        updateFormData.id,
        updateFormData.name,
        updateFormData.address,
        updateFormData.phone_number,
        updateFormData.email
      );
      const result = await getAllCustomers(currentPage, limit, searchTerm, filter);
      setCustomers(result.items);
      console.log(">>>>", result.items)
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

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pageButtons = [];
    const maxVisiblePages = 3;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(
          <Button
            key={i}
            variant={currentPage === i ? 'solid' : 'outline'}
            size="sm"
            colorScheme={currentPage === i ? 'teal' : 'gray'}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </Button>
        );
      }
    } else {
      if (currentPage > 2) {
        pageButtons.push(<Button key="before-2" size="sm" variant="outline" disabled>...</Button>);
      }

      for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
        pageButtons.push(
          <Button
            key={i}
            variant={currentPage === i ? 'solid' : 'outline'}
            size="sm"
            colorScheme={currentPage === i ? 'teal' : 'gray'}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </Button>
        );
      }

      if (currentPage < totalPages - 1) {
        pageButtons.push(<Button key="after-2" size="sm" variant="outline" disabled>...</Button>);
      }
    }

    return pageButtons;
  };

  const handleLimitChange = (value) => {
    setSelectedLimit(value);
    setLimit(value);
    setCurrentPage(1);
  };


  return (
    <Box bg="gray.200" minH="100vh" pb="5">
      <Container maxW="" mb="5" bg="white" p="4" boxShadow="md">
        <Heading as="h1" fontSize="xl">
          Customer List
        </Heading>
        <Text fontSize="sm" color="gray.500">
          Customer {'>'} Customer List
        </Text>
      </Container>

      <Container maxW="145ch" bg="white" p="4" borderRadius="md" boxShadow="md">
        <Flex justify="space-between" align="center" m="5" >
          <Flex direction="column">
            <Text as="h1" fontSize="xl" fontWeight="bold" mb="5">
              Customer List
            </Text>
            <Flex mb="5">
              <Link to="/add-customer">
                <Button backgroundColor="#2C6AE5" color="#FFFFFF">
                  Add Customer
                </Button>
              </Link>
            </Flex>
            <Flex>
              <Input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                mr="4"
              />
              <Select
                placeholder="Filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                w="150px"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Select>
            </Flex>
          </Flex>
        </Flex>

        <Table variant="simple">
          <Center>
            {loading && (
              <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
              />
            )}
          </Center>

          {!loading && (
            <>
              <Thead>
                <Tr>
                  <Th width="50px">
                    <Checkbox />
                  </Th>
                  <Th width="150px">Name</Th>
                  <Th width="150px">Email</Th>
                  <Th width="150px">Phone Number</Th>
                  <Th width="150px">Address</Th>
                  <Th width="100px">Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {customers.map((customer) => (
                  <Tr key={customer.id}>
                    <Td width="50px">
                      <Checkbox />
                    </Td>
                    <Td width="150px">{customer.name}</Td>
                    <Td width="150px">{customer.email}</Td>
                    <Td width="150px">{customer.phone_number}</Td>
                    <Td width="150px">{customer.address}</Td>
                    <Td width="100px">
                      <Menu>
                        <MenuButton
                          as={Button}
                          size="md"
                          colorScheme="blue"
                          variant="outline"
                        >
                          Action
                        </MenuButton>
                        <MenuList>
                          <MenuItem onClick={() => handleUpdateCustomer(customer.id)}>Update</MenuItem>
                          <MenuItem onClick={() => handleDeleteCustomer(customer.id)}>Delete</MenuItem>
                        </MenuList>
                      </Menu>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </>
          )}
        </Table>

        {/* Pagination */}
        <Flex justify="space-between" mt="4" mr="20" ml="10">
          <Flex>
            {[10, 20, 30].map((option) => (
              <Button
                key={option}
                colorScheme={selectedLimit === option ? 'teal' : 'gray'}
                onClick={() => handleLimitChange(option)}
                mr="2"
              >
                {option}
              </Button>
            ))}
          </Flex>

          <Flex>
            <Button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              isDisabled={currentPage === 1}

              colorScheme="teal"
            />

            {renderPagination()}
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              isDisabled={currentPage === totalPages}
              colorScheme="teal"
            />
          </Flex>
        </Flex>
      </Container>

      {/* Update Modal */}
      <Modal isOpen={isUpdateModalOpen} onClose={onCloseUpdateModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Customer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              name="name"
              placeholder="Name"
              mb="4"
              value={updateFormData.name}
              onChange={handleUpdateFormChange}
            />
            <Input
              name="email"
              placeholder="Email"
              mb="4"
              value={updateFormData.email}
              onChange={handleUpdateFormChange}
            />
            <Input
              name="phone_number"
              placeholder="Phone Number"
              mb="4"
              value={updateFormData.phone_number}
              onChange={handleUpdateFormChange}
            />
            <Input
              name="address"
              placeholder="Address"
              mb="4"
              value={updateFormData.address}
              onChange={handleUpdateFormChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleUpdateFormSubmit}>
              Update
            </Button>
            <Button onClick={onCloseUpdateModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={onCloseDeleteModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Customer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this customer?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleDeleteSubmit}>
              Delete
            </Button>
            <Button onClick={onCloseDeleteModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CustomerList;
