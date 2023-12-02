import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, TableContainer, Thead, Tbody, Tr, Th, Td, Menu, MenuButton, MenuList, MenuItem, IconButton, useToast, Button, Flex, Select, Spacer, Text, Heading, Box } from "@chakra-ui/react";
import { DeleteIcon, InfoIcon, TriangleDownIcon, SearchIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { getAllSupplyOrders, deleteSupplyOrder } from "../../fetching/supply_order";
import { getAllSuppliers } from "../../fetching/supplier"
import { getAllWarehouses } from "../../fetching/warehouse";
import { MultiSelect } from "react-multi-select-component";
import Navbar from "../../components/Navbar";
import { FaFilter } from "react-icons/fa";
import CustomHeader from "../../components/Boxtop";
import convertPrice from "../../lib/convertPrice";
import Paginate from "../../components/Paginate";
import Footer from "../../components/Footer";

const Supply_Orders = () => {
  const toast = useToast();
  const [supplyOrders, setSupplyOrders] = useState([]);
  const [selectedWarehouses, setSelectedWarehouses] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const fetchSupplyOrders = async () => {
    try {
      const response = await getAllSupplyOrders(
        currentPage,
        dataPerPage,
        null,
        selectedWarehouses.length === 0 ? null : selectedWarehouses.map(warehouse => warehouse.value),
        selectedSuppliers.length === 0 ? null : selectedSuppliers.map(supplier => supplier.value),
        selectedStatus.length === 0 ? null : selectedStatus.map(status => status.value).join(','),
      );
      setSupplyOrders(response.data);
      console.log(response.data, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Repsonse")
      setTotalPages(response.totalPage);
    } catch (error) {
      console.error("Error fetching supply orders:", error.message);
    }
  };

  const fetchWarehouses = async () => {
    try {
      const response = await getAllWarehouses();
      setWarehouses(response.data.map(warehouse => ({ label: warehouse.title, value: warehouse.id })));
    } catch (error) {
      console.error("Error fetching warehouses:", error.message);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await getAllSuppliers(1, 100, "");
      setSuppliers(response.items.map(supplier => ({ label: supplier.company_name, value: supplier.id })));
    } catch (error) {
      console.error("Error fetching Suppliers:", error.message);
    }
  };

  useEffect(() => {
    fetchSupplyOrders();
    fetchWarehouses();
    fetchSuppliers();
  }, [currentPage, selectedWarehouses, selectedSuppliers, selectedStatus, dataPerPage]);


  const handleDelete = async (id) => {
    try {
      const deleteRes = await deleteSupplyOrder(id);
      fetchSupplyOrders();
      toast({
        title: "Success",
        description: deleteRes.message || "Deleted Successfuly",
        position: "top",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting supply order:", error.message);
    }
  };

  const handleFilterSelect = (filterType) => {
    setSelectedFilter(filterType);
    if (filterType === "status") {
      setSelectedStatus([]);
    }
  };


  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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


  const handleDataPage = async (e) => {
    setDataPerPage(+e.target.value)
  }

  return (
    <div style={{ backgroundColor: "#f8f8f8", minHeight: "100vh" }}>
      <Navbar />
      <CustomHeader title={'Supply Orders'} subtitle={'Supply Orders List'} href={'supplier-orders'} subhref={'supplier-orders'} />
      <Box
        backgroundColor="white"
        margin="20px 20px"
        padding="20px"
        borderRadius="8px"
        boxShadow="0 4px 8px rgba(0,0,0,0.1)"
        display="flex"
        flexDirection="column"
      >
        <Box mx={"40px"} pt={"20px"}>
          <Heading fontSize={'22px'}>Supply Orders</Heading>
          <br />
          <Button colorScheme="linkedin" p={7} leftIcon={<PlusSquareIcon />} fontSize="xl" mb={5}>
            <Link to={`/add-supplier-orders`}>
              Add Supply Orders
            </Link>
          </Button>
          <Box maxWidth="full" display="flex">
            <Box width={"500px"} >
              {selectedFilter === "status" && (
                <MultiSelect
                  options={[
                    { label: "Pending", value: "pending" },
                    { label: "Success", value: "success" },
                  ]}
                  value={selectedStatus}
                  onChange={setSelectedStatus}
                  labelledBy="Select Status"
                  overrideStrings={{ allItemsAreSelected: "All Status", selectSomeItems: "Select Status" }}
                />
              )}
              {selectedFilter === "warehouse" && (
                <MultiSelect
                  options={warehouses}
                  value={selectedWarehouses}
                  onChange={setSelectedWarehouses}
                  labelledBy="Select Warehouse"
                  overrideStrings={{ allItemsAreSelected: "All Warehouses", selectSomeItems: "Select Warehouses" }}
                />
              )}
              {selectedFilter === "supplier" && (
                <MultiSelect
                  options={suppliers}
                  value={selectedSuppliers}
                  onChange={setSelectedSuppliers}
                  labelledBy="Select Suppliers"
                  overrideStrings={{ allItemsAreSelected: "All Suppliers", selectSomeItems: "Select Suppliers" }}
                />
              )}
              <br />
            </Box>
            <Spacer />
            <Flex justify={'flex-end'} mr={10}>
              <Box w={'140px'}>
                <Select placeholder='Data Page' onChange={handleDataPage} value={dataPerPage}>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                </Select>
              </Box>
            </Flex>
            <Box style={{ display: "flex", alignItems: "center", border: "2px solid", borderColor: "purple", borderRadius: "6px", padding: "2px", marginBottom: "24px" }}>
              <Menu>
                <MenuButton as={IconButton} icon={<FaFilter />} size="md" variant="outline" colorScheme="purple" style={{ background: "transparent", border: "none" }} />
                <MenuList>
                  <MenuItem onClick={() => handleFilterSelect("status")}>
                    <SearchIcon color={"purple"} mr={4} />
                    Filter by status
                  </MenuItem>
                  <MenuItem onClick={() => handleFilterSelect("warehouse")}>
                    <SearchIcon color={"purple"} mr={4} /> Filter by Warehouse
                  </MenuItem>
                  <MenuItem onClick={() => handleFilterSelect("supplier")}>
                    <SearchIcon color={"purple"} mr={4} /> Filter by Supplier
                  </MenuItem>
                </MenuList>
              </Menu>
              <Button size="lg" color="purple" style={{ background: "transparent" }}>Filter</Button>
            </Box>
            <br />
          </Box>
        </Box>
        <Box mx={"40px"}>
          <Table variant="simple" maxWidth="full" borderWidth="2px" borderColor="gray.200">
            <Thead>
              <Tr borderBottom={'2px solid #D9D9D9'} >
                <Th fontWeight="bold" fontSize="14px" textTransform="none" textColor={"black"}>ID</Th>
                <Th fontWeight="bold" fontSize="14px" textTransform="none" textColor={"black"}>Total Price</Th>
                <Th fontWeight="bold" fontSize="14px" textTransform="none" textColor={"black"}>Supplier</Th>
                <Th fontWeight="bold" fontSize="14px" textTransform="none" textColor={"black"}>Warehouse</Th>
                <Th fontWeight="bold" fontSize="14px" textTransform="none" textColor={"black"}>Status</Th>
                <Th fontWeight="bold" fontSize="14px" textTransform="none" textColor={"black"}>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {supplyOrders.map((order) => (
                <Tr key={order.id} href={`/supplier-orders/${order.id}`} borderBottom={'2px solid #D9D9D9'} >
                  <Td textColor={"gray.600"}>{order.id}</Td>
                  <Td textColor={"gray.600"}>{convertPrice(order.total_price)}</Td>
                  <Td textColor={"gray.600"}>{order.Supplier.company_name}</Td>
                  <Td textColor={"gray.600"}>{order.Warehouse.title}</Td>
                  <Td textColor={"gray.600"}>{order.status}</Td>
                  <Td textColor={"gray.600"}>
                    <Menu>
                      <MenuButton
                        as={Button}
                        size="md"
                        colorScheme="linkedin"
                        variant="outline"
                        rightIcon={<TriangleDownIcon />}
                      >
                        Action
                      </MenuButton>
                      <MenuList>
                        <Link to={`/supplier-orders/${order.id}`}>
                          <MenuItem>
                            <InfoIcon mr={4}></InfoIcon>
                            Detail
                          </MenuItem>
                        </Link>
                        <MenuItem onClick={() => handleDelete(order.id)}>
                          <DeleteIcon mr={4} /> Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>

                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <Box mr={"40px"}>
          <Paginate totalPages={totalPages} prevPage={prevPage} nextPage={nextPage} currentPage={currentPage} paginate={paginate} />
        </Box>
      </Box >

      <Footer />
    </div >
  );
};

export default Supply_Orders;