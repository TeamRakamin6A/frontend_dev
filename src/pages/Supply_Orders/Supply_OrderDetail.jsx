import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Button,
  Heading,
  Select,
  Flex,
  Box,
} from "@chakra-ui/react";
import { EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";

import {
  getSupplyOrderDetail,
  updateSupplyOrder,
} from "../../fetching/supply_order";
import { getSupplierById } from "../../fetching/supplier";
import { getWarehouseById } from "../../fetching/warehouse";
import Navbar from "../../components/Navbar";
import CustomHeader from "../../components/Boxtop";
import Loading from "../../components/Loading";
import convertPrice from "../../lib/convertPrice";
import Footer from "../../components/Footer";

const Supply_OrderDetail = () => {
  const { id } = useParams();
  const [supplyOrder, setSupplyOrder] = useState({});
  const [supplier, setSupplier] = useState({});
  const [warehouse, setWarehouse] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedStatus, setEditedStatus] = useState("");
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchSupplyOrderDetail = async () => {
      try {
        const response = await getSupplyOrderDetail(id);
        setSupplyOrder(response.data);

        const supplierResponse = await getSupplierById(response.data.supplier_id);
        setSupplier(supplierResponse.data);
        const warehouseResponse = await getWarehouseById(response.data.warehouse_id);
        setWarehouse(warehouseResponse);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching supply order detail:", error.message);
      }
    };
    setLoading(true)
    fetchSupplyOrderDetail();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedStatus(supplyOrder.status);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = async () => {
    try {
      await updateSupplyOrder(id, editedStatus);

      const response = await getSupplyOrderDetail(id);
      setSupplyOrder(response.data);

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating supply order:", error.message);
    }
  };

  if (loading) {
    return <Loading />
  }
  const statusOptions = ["Pending", "Success"];

  return (
    <div style={{ backgroundColor: "#f8f8f8", minHeight: "100vh" }}>
      <Navbar />
      <CustomHeader title={'Supply Orders'} subtitle={'Supply Orders Detail'} href={'supplier-orders'} subhref={`supplier-orders/${id}`} />
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
          <Heading fontSize={'22px'}>Supply Orders Detail</Heading>
          <Table
            variant="simple"
            colorScheme="gray"
            my={"20px"}
            maxWidth="full"
            borderWidth="1px"
            borderColor="gray.200"
          >
            <Thead>
              <Tr fontWeight="bold">
                <Th width="" fontWeight="bold" fontSize="14px" textTransform="none" textColor={"black"}>Invoice</Th>
                <Th width="" fontWeight="bold" fontSize="14px" textTransform="none" textColor={"black"}>Total Price</Th>
                <Th width="" fontWeight="bold" fontSize="14px" textTransform="none" textColor={"black"}>Supplier</Th>
                <Th width="" fontWeight="bold" fontSize="14px" textTransform="none" textColor={"black"}>Warehouse</Th>
                <Th width="" fontWeight="bold" fontSize="14px" textTransform="none" textColor={"black"}>Status</Th>
                <Th width="" fontWeight="bold" fontSize="14px" textTransform="none" textColor={"black"}>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td textColor={"gray.600"}>{supplyOrder.invoice}</Td>
                <Td textColor={"gray.600"}>{supplyOrder.total_price}</Td>
                <Td textColor={"gray.600"}>{supplier.company_name}</Td>
                <Td textColor={"gray.600"}>{warehouse.title}</Td>
                <Td textColor={"gray.600"}>
                  {isEditing ? (
                    <Select
                      value={editedStatus}
                      onChange={(e) => setEditedStatus(e.target.value)}
                    >
                      {statusOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                  ) : (
                    supplyOrder.status
                  )}
                </Td>
                <Td fontSize="14px" textColor={"gray.600"}>
                  {isEditing ? (
                    <>
                      <IconButton
                        icon={<CheckIcon />}
                        size="xs"
                        onClick={handleSaveEdit}
                        colorScheme="green"
                      />
                      <IconButton
                        icon={<CloseIcon />}
                        size="xs"
                        onClick={handleCancelEdit}
                        colorScheme="red"
                      />
                    </>
                  ) : (
                    <IconButton
                      icon={<EditIcon />}
                      size="lg"
                      onClick={handleEditClick}
                      colorScheme="blue"
                    />
                  )}
                </Td>
              </Tr>
            </Tbody>
          </Table>

          <Table mb={30}>
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Product</Th>
                <Th>Price</Th>
                <Th>Quantity</Th>
                <Th>Total Price</Th>
              </Tr>
            </Thead>
            <Tbody>
              {supplyOrder.Items?.map((el, idx) => (
                <Tr key={idx}>
                  <Td>{idx + 1}</Td>
                  <Td>{el.title}</Td>
                  <Td>{convertPrice(el.price)}</Td>
                  <Td>{el.Supply_Item.quantity}</Td>
                  <Td>{convertPrice(+el.price * +el.Supply_Item.quantity)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Flex justifyContent="flex-end" ml={16}>
            <Button as={Link} to="/supplier-orders" variant="outline" colorScheme="blue" p={5}>
              Back to Supply Orders
            </Button>
          </Flex>
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default Supply_OrderDetail;