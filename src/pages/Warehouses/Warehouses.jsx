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
  HStack,
  TableContainer
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
import { getAllWarehouses, deleteWarehouseById, updateWarehouse } from '../../fetching/warehouse';
import { MultiSelect } from "react-multi-select-component";
import Paginate from '../../components/Paginate';
import Navbar from '../../components/Navbar';
import CustomHeader from '../../components/Boxtop';

const Warehouses = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [itemPerPage] = useState(10);
  const [selectedLimit, setSelectedLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);
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

  const sortWarehouseById = (warehouses) => {
    return warehouses.sort((a, b) => a.id - b.id);
  };

  const fetchWarehouses = async () => {
    setLoading(true);

    try {
      const result = await getAllWarehouses(currentPage, itemPerPage, searchTerm);
      const sortedWarehouses = sortWarehouseById(result.data);
      setWarehouses(sortedWarehouses);
      setTotalPages(result.totalPage);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error.message);
      setLoading(false);
    }


  };

  useEffect(() => {

    setLoading(true);
    fetchWarehouses();
  }, [currentPage, itemPerPage, searchTerm]);

  const handleDeleteWarehouse = async (warehouseId) => {
    setSelectedWarehouseId(warehouseId);
    onOpenDeleteModal();
  };

  const handleDeleteSubmit = async () => {
    try {
      await deleteWarehouseById(selectedWarehouseId);
      const result = await getAllWarehouses(currentPage, limit, searchTerm);
      setWarehouses(result.data);
      onCloseDeleteModal();
      toast({
        title: 'Warehouse deleted successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting Warehouse:', error.message);
      toast({
        title: 'Error deleting warehouse.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }

  const handleUpdateWarehouse = (warehouseId) => {
    const selectedWarehouse = warehouses.find((warehouse) => warehouse.id === warehouseId);
    setUpdateFormData({
      id: selectedWarehouse.id,
      title: selectedWarehouse.title,
      address: selectedWarehouse.address
    });
    setSelectedWarehouseId(warehouseId);
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
      await updateWarehouse(
        updateFormData.id,
        updateFormData.title,
        updateFormData.address
      );

      fetchWarehouses();
      onCloseUpdateModal();
      toast({
        title: 'Warehouse update Status successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating warehouse:', error.message);
      toast({
        title: 'Error updating warehouse.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // const handleSearch = async () => {
  //   const res = await getAllWarehouses(currentPage, itemPerPage, q, null)
  //   setWarehouses(res.data.items)
  //   setTotalPage(res.data.totalPages)
  // }

  // const handleSearchChange = (selected) => {
  //   setSelectedOptions(selected);
  //   setSearchTerm(selected.map((option) => option.value).join(','));
  // };

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Navbar />
      <Box w={'full'} bg="gray.200" minH="100vh" >
        <CustomHeader title={'Warehouse'} subtitle={'Warehouse list'} href={'warehouses'} subhref={'warehouses'} />
        <Box p={'20px'} bg="white" borderRadius="md" boxShadow="md" m={"20px"}>
          <Flex justify="space-between" align="center" m="5" >
            <Flex direction="column">
              <Text as="h1" fontSize="xl" fontWeight="bold" mb="5">
                Warehouse List
              </Text>
              <Flex mb="5">
                <Link to="/addwarehouse">
                  <Button
                    colorScheme="blue"
                    leftIcon={<FiPlusCircle />}
                  >
                    Add Warehouse
                  </Button>
                </Link>
              </Flex>
              <Flex>
                {/* <Box w="600px">
                  <Text mb="2" fontWeight="bold">
                    Search Warehouse
                  </Text>
                  <MultiSelect
                    options={Warehouses.map((warehouse) => ({
                      label: warehouse.invoice,
                      value: warehouse.invoice,
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
                </Box> */}
              </Flex>
            </Flex>
          </Flex>
          <TableContainer rounded={'10px'} overflowX={'auto'} border={'2px solid #D9D9D9'}>
            <Table variant="simple" >

              {!loading && (
                <>
                  <Thead>
                    <Tr borderBottom={'2px solid #D9D9D9'}>
                      <Th width="50px">
                        <Checkbox />
                      </Th>
                      <Th width="150px">Title</Th>
                      <Th width="150px">Address</Th>
                      <Th width="100px">Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {warehouses.map((warehouse) => (
                      <Tr key={warehouse.id} borderBottom={'2px solid #D9D9D9'}>
                        <Td width="50px">
                          <Checkbox />
                        </Td>
                        <Td width="150px">
                          <Link to={`/warehouses/${warehouse.id}`}>{warehouse.title || "null"}</Link>
                        </Td>
                        <Td width="150px">{warehouse.address}</Td>
                        {/* <Td width="150px">{order.status}</Td> */}
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
                              <MenuItem onClick={() => handleUpdateWarehouse(warehouse.id)} icon={<FaRegEdit />}>Update</MenuItem>
                              <MenuItem onClick={() => handleDeleteWarehouse(warehouse.id)} icon={<RiDeleteBin6Line />}>Delete</MenuItem>
                            </MenuList>
                          </Menu>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </>
              )}
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Paginate totalPages={totalPages} itemPerPage={itemPerPage} prevPage={prevPage} nextPage={nextPage} currentPage={currentPage} paginate={paginate} />
        </Box>

        {/* Update Modal */}
        <Modal isOpen={isUpdateModalOpen} onClose={onCloseUpdateModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Data Warehose</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                name="title"
                placeholder="Title"
                mb="4"
                value={updateFormData.title}
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
              Are you sure you want to delete this Warehouse?
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={handleDeleteSubmit}>
                Delete
              </Button>
              <Button onClick={onCloseDeleteModal}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box >
    </>

  );
};

export default Warehouses;