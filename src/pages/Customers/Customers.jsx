import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Text,
  Button,
  IconButton,
  Input,
  Table,
  TableContainer,
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
  Select,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import {
  FaCaretDown,
  FaChevronLeft,
  FaChevronRight,
  FaRegEdit,
} from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { getAllCustomers, updateCustomer, deleteCustomer } from '../../fetching/customer';
import { MultiSelect } from "react-multi-select-component";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";
import CustomHeader from '../../components/Boxtop';
import Footer from "../../components/Footer";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [limit, setLimit] = useState();
  const [selectedLimit, setSelectedLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [loading, setLoading] = useState(false)

  const { isOpen: isUpdateModalOpen, onOpen: onOpenUpdateModal, onClose: onCloseUpdateModal } =
    useDisclosure();

  const { isOpen: isDeleteModalOpen, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } =
    useDisclosure();

  const toast = useToast();

  const [updatedCustomer, setUpdatedCustomer] = useState({
    id: null,
    name: '',
    address: '',
    phone_number: '',
    email: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const sortCustomersById = (customers) => {
    return customers.sort((a, b) => a.id - b.id);
  };

  useEffect(() => {
    setLoading(true)
    const fetchCustomers = async () => {
      try {
        const result = await getAllCustomers(currentPage, limit, searchTerm);
        const sortedCustomers = sortCustomersById(result.items);
        setCustomers(sortedCustomers);
        setTotalPages(result.totalPages);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching customers:', error.message);
      }
    };

    fetchCustomers();
  }, [currentPage, limit, searchTerm]);


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
    setLoading(true)
    try {
      const deleteRes = await deleteCustomer(selectedCustomerId);
      onCloseDeleteModal();
      toast({
        title: 'Success',
        description: deleteRes.message,
        status: 'success',
        position: 'top',
        duration: 3000,
        isClosable: true,
      });
      const result = await getAllCustomers(currentPage, limit, searchTerm);
      setCustomers(result.items);
      setLoading(false)
    } catch (error) {
      console.error('Error deleting customer:', error.message);
      toast({
        title: 'Error',
        description: error.message,
        position: 'top',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }

  const handleUpdateCustomer = (customerId) => {
    const selectedCustomer = customers.find((customer) => customer.id === customerId);
    setUpdatedCustomer({
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
    setUpdatedCustomer({
      ...updatedCustomer,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateFormSubmit = async () => {
    setLoading(true)
    try {
      const updateRes = await updateCustomer(
        updatedCustomer.id,
        updatedCustomer.name,
        updatedCustomer.address,
        updatedCustomer.phone_number,
        updatedCustomer.email
      );
      onCloseUpdateModal();
      toast({
        title: 'Success',
        description: updateRes.message,
        position: 'top',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      const result = await getAllCustomers(currentPage, limit, searchTerm);
      setCustomers(result.items);
      setLoading(false)
    } catch (error) {
      console.error('Error updating customer:', error.message);
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
            colorScheme={currentPage === i ? 'linkedin' : 'gray'}
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
            colorScheme={currentPage === i ? 'linkedin' : 'gray'}
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

  const handleSearchChange = (selected) => {
    setSelectedOptions(selected);
    setSearchTerm(selected.map((option) => option.value).join(','));
  };

  if (loading) {
    return (
      <Loading />
    )
  }


  return (
    <>
      <Navbar />
      <Box bg="gray.200" minH="100vh" pb="5">
        <CustomHeader title={'Customer'} subtitle={'Customer List'} href={'customers'} subhref={'customers'} />

        <Container maxW="145ch" bg="white" p="4" borderRadius="md" boxShadow="md" mt="5">
          <Flex align="flex-end" justify="space-between" m="5" >
            <Flex direction="column">
              <Text as="h1" fontSize="xl" fontWeight="bold" mb="5">
                Customer List
              </Text>
              <Flex mb="5">
                <Link to="/addcustomers">
                  <Button
                    colorScheme="linkedin"
                    leftIcon={<FiPlusCircle />}
                  >
                    Add Customer
                  </Button>
                </Link>
              </Flex>
              <Flex>
                <Box w="600px">
                  <Text mb="2" fontWeight="bold">
                    Search Customer
                  </Text>
                  <MultiSelect
                    options={customers.map((customer) => ({
                      label: customer.name,
                      value: customer.name,
                    }))}
                    value={selectedOptions}
                    onChange={handleSearchChange}
                    labelledBy="Select"
                    hasSelectAll={false}
                    overrideStrings={{
                      selectSomeItems: selectedOptions.length === 1 ? selectedOptions[0].label : 'Search...',
                      allItemsAreSelected: selectedOptions.length === customers.length ? selectedOptions.map(option => option.label).join(', ') : 'All',
                    }}
                  />
                </Box>
              </Flex>
            </Flex>
            <Flex mr="5">
              <Box w="140px">
                <Select
                  placeholder='Customer Page'
                  size="sm"
                  value={selectedLimit}
                  onChange={(e) => handleLimitChange(parseInt(e.target.value, 10))}
                >
                  {[10, 20, 30].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </Box>
            </Flex>
          </Flex>

          <TableContainer rounded={'10px'} overflowX={'auto'} border={'2px solid #D9D9D9'}>
            <Table variant="simple">
              <Thead>
                <Tr borderBottom={'2px solid #D9D9D9'} >
                  <Th width="50px">
                    <Checkbox isDisabled />
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
                  <Tr key={customer.id} borderBottom={'2px solid #D9D9D9'} >
                    <Td width="50px">
                      <Checkbox isDisabled />
                    </Td>
                    <Td width="150px">
                      <Link to={`/customers/${customer.id}`}>{customer.name}</Link>
                    </Td>
                    <Td width="150px">{customer.email}</Td>
                    <Td width="150px">{customer.phone_number}</Td>
                    <Td width="150px">{customer.address}</Td>
                    <Td width="100px">
                      <Menu>
                        <MenuButton
                          as={Button}
                          size="md"
                          colorScheme="linkedin"
                          variant="outline"
                          rightIcon={<FaCaretDown />}
                        >
                          Action
                        </MenuButton>
                        <MenuList>
                          <MenuItem onClick={() => handleUpdateCustomer(customer.id)} icon={<FaRegEdit />}>Update</MenuItem>
                          <MenuItem onClick={() => handleDeleteCustomer(customer.id)} icon={<RiDeleteBin6Line />}>Delete</MenuItem>
                        </MenuList>
                      </Menu>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Flex justify="flex-end" mt="4" mr="20" ml="10">
            <Flex>
              <IconButton
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                isDisabled={currentPage === 1}
                backgroundColor="white"
                color="black"
                size="sm"
                icon={<FaChevronLeft />}
              />

              {renderPagination()}

              <IconButton
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                isDisabled={currentPage === totalPages}
                backgroundColor="white"
                color="black"
                size="sm"
                icon={<FaChevronRight />}
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
              <Button colorScheme="green" mr={3} onClick={handleUpdateFormSubmit}>
                Update
              </Button>
              <Button colorScheme="red" onClick={onCloseUpdateModal}>Cancel</Button>
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
      <Footer />
    </>
  );
};

export default CustomerList;
