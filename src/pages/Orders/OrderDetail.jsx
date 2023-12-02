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
  getOrderById,
  updateOrder,
} from "../../fetching/order";
import { getCustomerById } from "../../fetching/customer";
import { getWarehouseById } from "../../fetching/warehouse";
import Navbar from "../../components/Navbar";
import CustomHeader from "../../components/Boxtop";
import Loading from "../../components/Loading";
import convertPrice from "../../lib/convertPrice";
import Footer from "../../components/Footer";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [customer, setCustomer] = useState({});
  const [warehouse, setWarehouse] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedStatus, setEditedStatus] = useState("");
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await getOrderById(id);
        setOrder(response.data);

        const customerResponse = await getCustomerById(response.data.customer_id);
        setCustomer(customerResponse.data);
        const warehouseResponse = await getWarehouseById(response.data.warehouse_id);
        setWarehouse(warehouseResponse);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching order detail:", error.message);
      }
    };
    setLoading(true)
    fetchOrderDetail();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedStatus(order.status);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = async () => {
    try {
      await updateOrder(id, editedStatus);

      const response = await getOrderById(id);
      setOrder(response.data);

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating order:", error.message);
    }
  };

  if (loading) {
    return <Loading />
  }
  const statusOptions = ["Pending", "Success"];

  return (
    <div style={{ backgroundColor: "#f8f8f8", minHeight: "100vh" }}>
      <Navbar />
      <CustomHeader title={'Orders'} subtitle={'Orders Detail'} href={'orders'} subhref={`orders/${id}`} />
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
          <Heading fontSize={'22px'}>Orders Detail</Heading>
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
                <Th width="" fontWeight="bold" fontSize="14px" textTransform="none" textColor={"black"}>Customer</Th>
                <Th width="" fontWeight="bold" fontSize="14px" textTransform="none" textColor={"black"}>Warehouse</Th>
                <Th width="" fontWeight="bold" fontSize="14px" textTransform="none" textColor={"black"}>Status</Th>
                <Th width="" fontWeight="bold" fontSize="14px" textTransform="none" textColor={"black"}>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td textColor={"gray.600"}>{order.invoice}</Td>
                <Td textColor={"gray.600"}>{order.total_price}</Td>
                <Td textColor={"gray.600"}>{customer.name}</Td>
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
                    order.status
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
                      colorScheme="linkedin"
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
              {order.Items?.map((el, idx) => (
                <Tr key={idx}>
                  <Td>{idx + 1}</Td>
                  <Td>{el.title}</Td>
                  <Td>{convertPrice(el.price)}</Td>
                  <Td>{el.Order_Item.quantity}</Td>
                  <Td>{convertPrice(+el.price * +el.Order_Item.quantity)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Flex justifyContent="flex-end" ml={16}>
            <Button as={Link} to="/orders" variant="outline" colorScheme="linkedin" p={5}>
              Back to List Orders
            </Button>
          </Flex>
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default OrderDetail;