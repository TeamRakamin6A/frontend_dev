import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td, Menu, MenuButton, MenuList, MenuItem, IconButton, useToast, Button, ButtonGroup, Spacer, Text, Heading, Box } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon, DeleteIcon, InfoIcon, TriangleDownIcon, SearchIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { getAllSupplyOrders, deleteSupplyOrder, getAllWarehouses, getAllSuppliers } from "../../fetching/supply_order";
import { MultiSelect } from "react-multi-select-component";
import Navbar from "../../components/Navbar";
import { FaFilter } from "react-icons/fa";
import CustomHeader from "../../components/BoxTop";

const Supply_Orders = () => {
  const toast = useToast();
  const [supplyOrders, setSupplyOrders] = useState([]);
  const [selectedWarehouses, setSelectedWarehouses] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState([]);

  useEffect(() => {
    fetchSupplyOrders();
    fetchWarehouses();
    fetchSuppliers();
  }, [currentPage, selectedWarehouses, selectedSuppliers, selectedStatus]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const fetchSupplyOrders = async () => {
    try {
      const response = await getAllSupplyOrders(
        currentPage,
        5,
        null,
        selectedWarehouses.length === 0 ? null : selectedWarehouses.map(warehouse => warehouse.value),
        selectedSuppliers.length === 0 ? null : selectedSuppliers.map(supplier => supplier.value),
        selectedStatus.length === 0 ? null : selectedStatus.map(status => status.value).join(','),
      );
      setSupplyOrders(response.data);
      setTotalPages(response.totalPage);
      console.log(response.totalPage, "<<<<<<<<<<<<<<<<<<<<<<<<<<")
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
      const response = await getAllSuppliers();
      setSuppliers(response.items.map(supplier => ({ label: supplier.company_name, value: supplier.id })));
    } catch (error) {
      console.error("Error fetching Suppliers:", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSupplyOrder(id);
      fetchSupplyOrders();
      toast({
        title: "Delete Success",
        description: "deleted",
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

  return (
    <div style={{ backgroundColor: "#f8f8f8", minHeight: "100vh" }}>
      <Navbar />
      <CustomHeader title="Supply Orders" subtitle="Supply Orders List" />
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
          <Button colorScheme="messenger" p={7} leftIcon={<PlusSquareIcon />} fontSize="xl" mb={5}>
            <Link to={`/add-supplier-orders`}>
              Add Supply Orders
            </Link>
          </Button>
          <Box axWidth="full" display="flex">
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
          <Table variant="simple" maxWidth="full" borderWidth="1px" borderColor="gray.200">
            <Thead>
              <Tr>
                <Th fontWeight="bold" fontSize="14px" textTransform="none" textColor={"black"}>ID</Th>
                <Th fontWeight="bold" fontSize="14px" textTransform="none" textColor={"black"}>Invoice</Th>
                <Th fontWeight="bold" fontSize="14px" textTransform="none" textColor={"black"}>Total Price</Th>
                <Th fontWeight="bold" fontSize="14px" textTransform="none" textColor={"black"}>Supplier</Th>
                <Th fontWeight="bold" fontSize="14px" textTransform="none" textColor={"black"}>Warehouse</Th>
                <Th fontWeight="bold" fontSize="14px" textTransform="none" textColor={"black"}>Status</Th>
                <Th fontWeight="bold" fontSize="14px" textTransform="none" textColor={"black"}>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {supplyOrders.map((order) => (
                <Tr key={order.id}>
                  <Td fontSize="12px" textColor={"gray.600"}>{order.id}</Td>
                  <Td fontSize="12px" textColor={"gray.600"}>
                    <Link to={`/supplier-orders/${order.id}`}>{order.invoice}</Link>
                  </Td>
                  <Td fontSize="12px" textColor={"gray.600"}>{order.total_price}</Td>
                  <Td fontSize="12px" textColor={"gray.600"}>{order.supplier_id}</Td>
                  <Td fontSize="12px" textColor={"gray.600"}>{order.warehouse_id}</Td>
                  <Td fontSize="12px" textColor={"gray.600"}>{order.status}</Td>
                  <Td fontSize="12px" textColor={"gray.600"}>
                    <Box style={{ display: "flex", alignItems: "center", border: "2px solid", maxWidth: "120px", borderColor: "blue", borderRadius: "6px", padding: "2px" }}>
                      <Button size="lg" style={{ background: "transparent", marginRight: 2 }}>
                        <Text ml={2} textColor={"blue"}>Action</Text>
                      </Button>
                      <Menu>
                        <MenuButton as={IconButton} icon={<TriangleDownIcon />} size="md" variant="outline" colorScheme="blue" style={{ background: "transparent", border: "none" }} />
                        <MenuList>
                          <MenuItem>
                            <InfoIcon mr={4}></InfoIcon>
                            <Link to={`/supplier-orders/${order.id}`}>
                              Detail
                            </Link>
                          </MenuItem>
                          <MenuItem onClick={() => handleDelete(order.id)}>
                            <DeleteIcon mr={4} /> Delete
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Box>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <div style={{ marginTop: "20px", textAlign: "right", marginRight: "40px" }}>
          <ButtonGroup isAttached>
            <IconButton
              icon={<ChevronLeftIcon />}
              onClick={() => handlePageChange(currentPage - 1)}
              isDisabled={currentPage === 1}
            />
            <Button onClick={() => handlePageChange(currentPage - 1)} isDisabled={currentPage === 1}>
              {currentPage - 1}
            </Button>
            <Button colorScheme="blue" onClick={() => handlePageChange(currentPage)}>
              {currentPage}
            </Button>
            <Button onClick={() => handlePageChange(currentPage + 1)} isDisabled={currentPage === totalPages}>
              {currentPage + 1}
            </Button>
            <IconButton
              icon={<ChevronRightIcon />}
              onClick={() => handlePageChange(currentPage + 1)}
              isDisabled={currentPage === totalPages}
            />
          </ButtonGroup>
        </div>
      </Box >
    </div >
  );
};

export default Supply_Orders;
