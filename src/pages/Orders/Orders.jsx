import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td, Menu, MenuButton, MenuList, MenuItem, IconButton, useToast, Button, ButtonGroup, Spacer, Text, Heading, Box } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon, DeleteIcon, InfoIcon, TriangleDownIcon, SearchIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { getAllOrder, deleteOrder } from "../../fetching/order";
import { getAllCustomers } from "../../fetching/customer"
import { getAllWarehouses } from "../../fetching/warehouse";
import { MultiSelect } from "react-multi-select-component";
import Navbar from "../../components/Navbar";
import { FaFilter } from "react-icons/fa";
import CustomHeader from "../../components/Boxtop";
import convertPrice from "../../lib/convertPrice";
import Paginate from "../../components/Paginate";
import Footer from "../../components/Footer";

const Orders = () => {
  const toast = useToast();
  const [orders, setOrders] = useState([]);
  const [selectedWarehouses, setSelectedWarehouses] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState([]);

  useEffect(() => {
    fetchOrders();
    fetchWarehouses();
    fetchCustomers();
  }, [currentPage, selectedWarehouses, selectedCustomers, selectedStatus]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchOrders = async () => {
    try {
      const response = await getAllOrder(
        currentPage,
        5,
        null,
        selectedWarehouses.length === 0 ? null : selectedWarehouses.map(warehouse => warehouse.value),
        selectedCustomers.length === 0 ? null : selectedCustomers.map(customer => customer.value),
        selectedStatus.length === 0 ? null : selectedStatus.map(status => status.value).join(','),
      );
      setOrders(response.data);
      setTotalPages(response.totalPage);
    } catch (error) {
      console.error("Error fetching orders:", error.message);
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

  const fetchCustomers = async () => {
    try {
      const response = await getAllCustomers(1, 100, "");
      setCustomers(response.items.map(customer => ({ label: customer.name, value: customer.id })));
    } catch (error) {
      console.error("Error fetching Customers:", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const deleteRes = await deleteOrder(id);
      fetchOrders();
      toast({
        title: "Success",
        description: deleteRes.message | "Success to delete Order",
        position: "top",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting order:", error.message);
      toast({
        title: "Error",
        description: error.message || "Failed to deleting supply order",
        position: "top",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleFilterSelect = (filterType) => {
    setSelectedFilter(filterType);
    if (filterType === "status") {
      setSelectedStatus([]);
    }
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

  return (
    <div style={{ backgroundColor: "#f8f8f8", minHeight: "100vh" }}>
      <Navbar />
      <CustomHeader title={'Orders'} subtitle={'Orders List'} href={'orders'} subhref={'orders'} />
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
          <Heading fontSize={'22px'}>Orders</Heading>
          <br />
          <Button colorScheme="linkedin" p={7} leftIcon={<PlusSquareIcon />} fontSize="xl" mb={5}>
            <Link to={`/addorders`}>
              Add Orders
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
              {selectedFilter === "customer" && (
                <MultiSelect
                  options={customers}
                  value={selectedCustomers}
                  onChange={setSelectedCustomers}
                  labelledBy="Select Customer"
                  overrideStrings={{ allItemsAreSelected: "All Customers", selectSomeItems: "Select Customers" }}
                />
              )}
              <br />
            </Box>
            <Spacer />
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
                  <MenuItem onClick={() => handleFilterSelect("customer")}>
                    <SearchIcon color={"purple"} mr={4} /> Filter by Customer
                  </MenuItem>
                </MenuList>
              </Menu>
              <Button size="lg" color="purple" style={{ background: "transparent" }}>Filter</Button>
            </Box>
            <br />
          </Box>
        </Box>
        <Box mx={"40px"}>
          <Table variant="simple" maxWidth="full" borderWidth="1px" borderColor="gray.200">
            <Thead>
              <Tr>
                <Th fontWeight="bold" fontSize="14px" textTransform="none" textColor={"black"}>ID</Th>
                <Th fontWeight="bold" fontSize="14px" textTransform="none" textColor={"black"}>Total Price</Th>
                <Th fontWeight="bold" fontSize="14px" textTransform="none" textColor={"black"}>Customer</Th>
                <Th fontWeight="bold" fontSize="14px" textTransform="none" textColor={"black"}>Warehouse</Th>
                <Th fontWeight="bold" fontSize="14px" textTransform="none" textColor={"black"}>Status</Th>
                <Th fontWeight="bold" fontSize="14px" textTransform="none" textColor={"black"}>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders.map((order) => (
                <Tr key={order.id} href={`/orders/${order.id}`} >
                  <Td textColor={"gray.600"}>{order.id}</Td>
                  <Td textColor={"gray.600"}>{convertPrice(order.total_price)}</Td>
                  <Td textColor={"gray.600"}>{order.Customer.name}</Td>
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
                        <Link to={`/orders/${order.id}`}>
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

export default Orders;