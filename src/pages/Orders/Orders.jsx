import { useState, useEffect } from 'react';
import {
  Box,
  Center,
  Container,
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
  useDisclosure,
  useToast,
  Spinner,
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
import { getAllOrder, updateOrder, deleteOrder } from '../../fetching/order';
import { MultiSelect } from "react-multi-select-component";
import Navbar from '../../components/Navbar';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState();
  const [selectedLimit, setSelectedLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const { isOpen: isUpdateModalOpen, onOpen: onOpenUpdateModal, onClose: onCloseUpdateModal } =
    useDisclosure();

  const { isOpen: isDeleteModalOpen, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } =
    useDisclosure();

  const toast = useToast();

  const [updateFormData, setUpdateFormData] = useState({
    id: null,
    status: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const sortOrdersById = (orders) => {
    return orders.sort((a, b) => a.id - b.id);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);

      try {
        const result = await getAllOrder(currentPage, limit, searchTerm);
        const sortedOrders = sortOrdersById(result.data);
        setOrders(sortedOrders);
        setTotalPages(result.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error.message);
        setLoading(false);
      }

      setLoading(false);

    };

    fetchOrders();
  }, [currentPage, limit, searchTerm]);


  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleDeleteOrder = async (orderId) => {
    setSelectedOrderId(orderId);
    onOpenDeleteModal();
  };

  const handleDeleteSubmit = async () => {
    try {
      await deleteOrder(selectedOrderId);
      const result = await getAllOrder(currentPage, limit, searchTerm);
      setOrders(result.data);
      onCloseDeleteModal();
      toast({
        title: 'Order deleted successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting Order:', error.message);
      toast({
        title: 'Error deleting order.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }

  const handleUpdateOrder = (orderId) => {
    const selectedOrder = orders.find((order) => order.id === orderId);
    setUpdateFormData({
      id: selectedOrder.id,
      status: selectedOrder.status,
    });
    setSelectedOrderId(orderId);
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
      await updateOrder(
        updateFormData.id,
        updateFormData.status,
      );

      await getAllOrder(currentPage, limit, searchTerm);
      onCloseUpdateModal(); sear
      toast({
        title: 'Order update Status successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating order:', error.message);
      toast({
        title: 'Error updating order.',
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
            colorScheme={currentPage === i ? 'blue' : 'gray'}
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

  const handleSearchChange = (selected) => {
    setSelectedOptions(selected);
    setSearchTerm(selected.map((option) => option.value).join(','));
  };

  return (
    <>
      <Navbar />
      <Box bg="gray.200" minH="100vh" pb="5">
        <Container maxW="" mb="5" bg="white" p="4" boxShadow="md">
          <Heading as="h1" fontSize="xl">
            Order List
          </Heading>
          <Text fontSize="sm" color="gray.500">
            Order {'>'} Order List
          </Text>
        </Container>

        <Container maxW="145ch" bg="white" p="4" borderRadius="md" boxShadow="md">
          <Flex justify="space-between" align="center" m="5" >
            <Flex direction="column">
              <Text as="h1" fontSize="xl" fontWeight="bold" mb="5">
                Order List
              </Text>
              <Flex mb="5">
                <Link to="/addorders">
                  <Button
                    colorScheme="blue"
                    leftIcon={<FiPlusCircle />}
                  >
                    Add Order
                  </Button>
                </Link>
              </Flex>
              <Flex>
                <Box w="600px">
                  <Text mb="2" fontWeight="bold">
                    Search Order
                  </Text>
                  <MultiSelect
                    options={orders.map((order) => ({
                      label: order.invoice,
                      value: order.invoice,
                    }))}
                    value={selectedOptions}
                    onChange={handleSearchChange}
                    labelledBy="Select"
                    hasSelectAll={false}
                    overrideStrings={{
                      selectSomeItems: selectedOptions.length === 1 ? selectedOptions[0].label : 'Search...',
                      allItemsAreSelected: selectedOptions.length === orders.length ? selectedOptions.map(option => option.label).join(', ') : 'All',
                    }}
                  />
                </Box>
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
                    <Th width="150px">Invoice</Th>
                    <Th width="150px">Total Price</Th>
                    <Th width="150px">Status</Th>
                    <Th width="100px">Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {orders.map((order) => (
                    <Tr key={order.id}>
                      <Td width="50px">
                        <Checkbox />
                      </Td>
                      <Td width="150px">
                        <Link to={`/orders/${order.invoice}`}>{order.invoice}</Link>
                      </Td>
                      <Td width="150px">{order.total_price}</Td>
                      <Td width="150px">{order.status}</Td>
                      <Td width="100px">
                        <Menu>
                          <MenuButton
                            as={Button}
                            size="md"
                            colorScheme="blue"
                            variant="outline"
                            rightIcon={<FaCaretDown />}
                          >
                            Action
                          </MenuButton>
                          <MenuList>
                            <MenuItem onClick={() => handleUpdateOrder(order.id)} icon={<FaRegEdit />}>Update</MenuItem>
                            <MenuItem onClick={() => handleDeleteOrder(order.id)} icon={<RiDeleteBin6Line />}>Delete</MenuItem>
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
                  colorScheme={selectedLimit === option ? 'blue' : 'gray'}
                  onClick={() => handleLimitChange(option)}
                  mr="1"
                  size="sm"
                >
                  {option}
                </Button>
              ))}
            </Flex>

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
            <ModalHeader>Update Order</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                name="status"
                placeholder="Update Status"
                mb="4"
                value={updateFormData.status}
                onChange={handleUpdateFormChange}
              />
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
            <ModalHeader>Delete Order</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Are you sure you want to delete this Order?
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
    </>

  );
};

export default OrderList;
