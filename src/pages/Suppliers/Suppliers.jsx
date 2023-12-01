import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Text,
  Button,
  IconButton,
  Input,
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
  Select,
  useDisclosure,
  useToast,
  TableContainer,
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
import { getAllSuppliers, updateSupplier, deleteSupplier } from '../../fetching/supplier';
import { MultiSelect } from "react-multi-select-component";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";
import Footer from "../../components/Footer";
import CustomHeader from "../../components/Boxtop";

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [limit, setLimit] = useState();
  const [selectedLimit, setSelectedLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const { isOpen: isUpdateModalOpen, onOpen: onOpenUpdateModal, onClose: onCloseUpdateModal } =
    useDisclosure();

  const { isOpen: isDeleteModalOpen, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } =
    useDisclosure();

  const toast = useToast();

  const [updatedSupplier, setUpdatedSupplier] = useState({
    id: null,
    company_name: '',
    address: '',
    email: '',
    zip_code: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const sortSuppliersById = (suppliers) => {
    return suppliers.sort((a, b) => a.id - b.id);
  };

  useEffect(() => {
    setLoading(true);
    const fetchSuppliers = async () => {
      try {
        const result = await getAllSuppliers(currentPage, limit, searchTerm);
        const sortedSuppliers = sortSuppliersById(result.items);
        setSuppliers(sortedSuppliers);
        setTotalPages(result.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching suppliers:', error.message);
      }
    };

    fetchSuppliers();
  }, [currentPage, limit, searchTerm]);


  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleDeleteSupplier = async (supplierId) => {
    setSelectedSupplierId(supplierId);
    onOpenDeleteModal();
  };

  const handleDeleteSubmit = async () => {
    try {
      await deleteSupplier(selectedSupplierId);
      const result = await getAllSuppliers(currentPage, limit, searchTerm);
      setSuppliers(result.items);
      onCloseDeleteModal();
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
  }

  const handleUpdateSupplier = (supplierId) => {
    const selectedSupplier = suppliers.find((supplier) => supplier.id === supplierId);
    setUpdatedSupplier({
      id: selectedSupplier.id,
      company_name: selectedSupplier.company_name,
      address: selectedSupplier.address,
      email: selectedSupplier.email,
      zip_code: selectedSupplier.zip_code,
    });
    setSelectedSupplierId(supplierId);
    onOpenUpdateModal();
  };

  const handleUpdateFormChange = (e) => {
    setUpdatedSupplier({
      ...updatedSupplier,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateFormSubmit = async () => {
    try {
      await updateSupplier(
        updatedSupplier.id,
        updatedSupplier.company_name,
        updatedSupplier.address,
        updatedSupplier.email,
        updatedSupplier.zip_code
      );
      const result = await getAllSuppliers(currentPage, limit, searchTerm);
      setSuppliers(result.items);
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
      <CustomHeader title={'Supplier'} subtitle={'Supplier List'} href={'suppliers'} subhref={`suppliers`} />

        <Container maxW="container.xl" bg="white" p="4" borderRadius="md" boxShadow="md" mt="5">
          <Flex align="flex-end" justify="space-between" m="5">
            <Flex direction="column">
              <Text as="h1" fontSize="xl" fontWeight="bold" mb="5">
                Supplier List
              </Text>
              <Flex mb="5">
                <Link to="/addsuppliers">
                  <Button colorScheme="linkedin" leftIcon={<FiPlusCircle />}>
                    Add Supplier
                  </Button>
                </Link>
              </Flex>
              <Box w="600px" mb="5">
                <Text mb="2" fontWeight="bold">
                  Search Supplier
                </Text>
                <MultiSelect
                  options={suppliers.map((supplier) => ({
                    label: supplier.company_name,
                    value: supplier.company_name,
                  }))}
                  value={selectedOptions}
                  onChange={handleSearchChange}
                  labelledBy="Select"
                  hasSelectAll={false}
                  overrideStrings={{
                    selectSomeItems: selectedOptions.length === 1 ? selectedOptions[0].label : 'Search...',
                    allItemsAreSelected: selectedOptions.length === suppliers.length ? selectedOptions.map(option => option.label).join(', ') : 'All',
                  }}
                />
              </Box>
            </Flex>
            <Flex mr="5">
              <Box w="140px">
                <Select
                  placeholder='Supplier Page'
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
                <Tr borderBottom={'2px solid #D9D9D9'}>
                  <Th width="50px">
                    <Checkbox isDisabled />
                  </Th>
                  <Th width="150px">Company Name</Th>
                  <Th width="150px">Email</Th>
                  <Th width="150px">Zip Code</Th>
                  <Th width="150px">Address</Th>
                  <Th width="100px">Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {suppliers.map((supplier) => (
                  <Tr key={supplier.id} borderBottom={'2px solid #D9D9D9'}>
                    <Td width="50px">
                      <Checkbox isDisabled />
                    </Td>
                    <Td width="150px">
                      <Link to={`/suppliers/${supplier.id}`}>{supplier.company_name}</Link>
                    </Td>
                    <Td width="150px">{supplier.email}</Td>
                    <Td width="150px">{supplier.zip_code}</Td>
                    <Td width="150px">{supplier.address}</Td>
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
                          <MenuItem onClick={() => handleUpdateSupplier(supplier.id)} icon={<FaRegEdit />}>Update</MenuItem>
                          <MenuItem onClick={() => handleDeleteSupplier(supplier.id)} icon={<RiDeleteBin6Line />}>Delete</MenuItem>
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
            <ModalHeader>Delete Supplier</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Are you sure you want to delete this supplier?
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

export default SupplierList;
