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
} from 'react-icons/fa';
import { FiPlusCircle } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { getAllCategories, updateCategorie, deleteCategorie } from '../../fetching/category';
import { MultiSelect } from 'react-multi-select-component';
import Navbar from '../../components/Navbar';
import Loading from '../../components/Loading';
import Footer from "../../components/Footer";
import CustomHeader from '../../components/Boxtop';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [limit, setLimit] = useState();
  const [selectedLimit, setSelectedLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategorieId, setSelectedCategorieId] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const { isOpen: isUpdateModalOpen, onOpen: onOpenUpdateModal, onClose: onCloseUpdateModal } = useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } = useDisclosure();
  const toast = useToast();

  const [updatedCategorie, setUpdatedCategorie] = useState({
    id: null,
    title: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const sortCategoriesById = (categories) => {
    if (!categories) {
      return [];
    }
    return categories.sort((a, b) => a.id - b.id);
  };

  useEffect(() => {
    setLoading(true);
    const fetchCategories = async () => {
      try {
        const result = await getAllCategories(currentPage, limit, searchTerm);
        const sortedCategories = sortCategoriesById(result.data);
        setCategories(sortedCategories);
        setTotalPages(result.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      }
    };

    fetchCategories();
  }, [currentPage, limit, searchTerm]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleDeleteCategorie = async (categorieId) => {
    setSelectedCategorieId(categorieId);
    onOpenDeleteModal();
  };

  const handleDeleteSubmit = async () => {
    try {
      await deleteCategorie(selectedCategorieId);
      const result = await getAllCategories(currentPage, limit, searchTerm);
      setCategories(result.data);
      onCloseDeleteModal();
      toast({
        title: 'Categorie deleted successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting categorie:', error.message);
      toast({
        title: 'Error deleting categorie.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateCategorie = (categorieId) => {
    const selectedCategorie = categories.find((categorie) => categorie.id === categorieId);
    setUpdatedCategorie({
      id: selectedCategorie.id,
      title: selectedCategorie.title,
    });
    setSelectedCategorieId(categorieId);
    onOpenUpdateModal();
  };

  const handleUpdateFormChange = (e) => {
    setUpdatedCategorie({
      ...updatedCategorie,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateFormSubmit = async () => {
    try {
      await updateCategorie(
        updatedCategorie.id,
        updatedCategorie.title,
      );
      const result = await getAllCategories(currentPage, limit, searchTerm);
      setCategories(result.data);
      onCloseUpdateModal();
      toast({
        title: 'Categorie updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating categorie:', error.message);
      toast({
        title: 'Error updating categorie.',
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
    );
  }

  return (
    <>
      <Navbar />
      <Box bg="gray.200" minH="88vh" pb="5">
        <CustomHeader title={'Category'} subtitle={'Category List'} href={'categories'} subhref={'categories'} />

        <Container maxW="145ch" bg="white" p="4" borderRadius="md" boxShadow="md" mt="5">
          <Flex justify="space-between" align="flex-end" m="5" >
            <Flex direction="column">
              <Text as="h1" fontSize="xl" fontWeight="bold" mb="5">
                Category List
              </Text>
              <Flex mb="5">
                <Link to="/addcategories">
                  <Button
                    colorScheme="linkedin"
                    leftIcon={<FiPlusCircle />}
                  >
                    Add Category
                  </Button>
                </Link>
              </Flex>
              <Flex>
                <Box w="600px">
                  <Text mb="2" fontWeight="bold">
                    Search Category
                  </Text>
                  <MultiSelect
                    options={categories.map((categorie) => ({
                      label: categorie.title,
                      value: categorie.title,
                    }))}
                    value={selectedOptions}
                    onChange={handleSearchChange}
                    labelledBy="Select"
                    hasSelectAll={false}
                    overrideStrings={{
                      selectSomeItems: selectedOptions.length === 1 ? selectedOptions[0].label : 'Search...',
                      allItemsAreSelected: selectedOptions.length === categories.length ? selectedOptions.map(option => option.label).join(', ') : 'All',
                    }}
                  />
                </Box>
              </Flex>
            </Flex>
            <Flex mr="5">
              <Box w="140px">
                <Select
                  placeholder='Category Page'
                  size="sm"
                  value={selectedLimit}
                  onChange={(e) => handleLimitChange(parseInt(e.target.value, 10))}
                >
                  {[10, 2, 30].map((option) => (
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
                  <Th width="150px">Title</Th>
                  <Th width="150px">Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {categories.map((categorie) => (
                  <Tr key={categorie.id} borderBottom={'2px solid #D9D9D9'} >
                    <Td width="50px">
                      <Checkbox isDisabled />
                    </Td>
                    <Td width="150px">
                      <Link to={`/categories/${categorie.id}`}>{categorie.title}</Link>
                    </Td>
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
                          <MenuItem onClick={() => handleUpdateCategorie(categorie.id)} icon={<FaRegEdit />}>Update</MenuItem>
                          <MenuItem onClick={() => handleDeleteCategorie(categorie.id)} icon={<RiDeleteBin6Line />}>Delete</MenuItem>
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
            <ModalHeader>Update Category</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb="4" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  name="title"
                  placeholder="Title"
                  value={updatedCategorie.title}
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
            <ModalHeader>Delete Category</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Are you sure you want to delete this category?
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

export default Categories;
