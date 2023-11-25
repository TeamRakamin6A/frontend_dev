import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Select, useToast, Box, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import {
    createSupplyOrder,
    getAllWarehouses,
    getAllSuppliers,
    getItems,
} from "../../fetching/supply_order";
import CustomHeader from "../../components/BoxTop";

const AddSupplyOrders = () => {
    const toast = useToast();
    const [formData, setFormData] = useState({
        invoice: "",
        total_price: 0,
        supplier_id: "",
        warehouse_id: "",
        status: "Pending",
        items: [],
    });

    const [warehouses, setWarehouses] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchWarehouses();
        fetchSuppliers();
        fetchItems();
    }, []);

    const fetchWarehouses = async () => {
        try {
            const response = await getAllWarehouses();
            setWarehouses(response.data);
        } catch (error) {
            console.error("Error fetching warehouses:", error.message);
        }
    };

    const fetchSuppliers = async () => {
        try {
            const response = await getAllSuppliers();
            setSuppliers(response.items);
        } catch (error) {
            console.error("Error fetching Suppliers:", error.message);
        }
    };

    const fetchItems = async () => {
        try {
            const response = await getItems();
            setItems(response.data.items);
        } catch (error) {
            console.error("Error fetching items:", error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "items") {
            const selectedItems = items.filter((item) => value.includes(item.id));
            const updatedItems = selectedItems.map((selectedItem) => ({
                id: selectedItem.id,
                title: selectedItem.title,
                quantity: 1,
                price: selectedItem.price,
            }));

            setFormData((prevData) => ({
                ...prevData,
                items: updatedItems,
                total_price: calculateTotalPrice(updatedItems),
            }));
        } else if (name === "quantity") {
            const { id, value: quantity } = e.target;
            const updatedItems = formData.items.map((item) =>
                item.id === id ? { ...item, quantity: +quantity } : item
            );

            setFormData((prevData) => ({
                ...prevData,
                items: updatedItems,
                total_price: calculateTotalPrice(updatedItems),
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const calculateTotalPrice = (items) => {
        return items.reduce((total, item) => total + item.quantity * item.price, 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = {
                invoice: formData.invoice,
                total_price: formData.total_price,
                supplier_id: formData.supplier_id,
                warehouse_id: formData.warehouse_id,
                status: formData.status,
                items: formData.items.map((item) => ({
                    id: item.id,
                    quantity: item.quantity,
                    price_item: item.price,
                })),

            };

            await createSupplyOrder(data);

            toast({
                title: "Success",
                description: "Supply order created successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error("Error creating supply order:", error.message);
            toast({
                title: "Error",
                description: "Failed to create supply order",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <div style={{ backgroundColor: "#f8f8f8", minHeight: "100vh" }}>
            <Navbar />
            <CustomHeader title="Supply Orders" subtitle="Add Supply Orders" />
            <Box bg="white" m="40px" minHeight={"fit-content"}>
                <Heading ml="60px" pt="40px" pb="20px" fontSize={'22px'}>
                    Add Supply Order
                </Heading>
                <Box display="flex">
                    <Box flex="1" mx="60px" pt="20px">
                        <form onSubmit={handleSubmit}>
                            <SimpleGrid columns={2} spacing={10}>
                                <Box style={{ fontSize: "14px", fontWeight: "bold" }}>
                                    Invoice
                                    <Input
                                        type="text"
                                        fontSize="14px"
                                        height="40px"
                                        name="invoice"
                                        value={formData.invoice}
                                        onChange={handleChange}
                                        required

                                    />
                                </Box>
                                <Box style={{ fontSize: "14px", fontWeight: "bold", }}>
                                    Total Price
                                    <Input
                                        type="number"
                                        fontSize="14px"
                                        height="40px"
                                        name="total_price"
                                        value={formData.total_price}
                                        onChange={handleChange}
                                        required
                                    />
                                </Box>
                                <Box style={{ fontSize: "14px", fontWeight: "bold", }}>
                                    Supplier
                                    <Select
                                        name="supplier_id"
                                        fontSize="14px"
                                        height="40px"
                                        value={formData.supplier_id}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled>
                                            Select a supplier
                                        </option>
                                        {suppliers.map((supplier) => (
                                            <option key={supplier.id} value={supplier.id}>
                                                {supplier.company_name}
                                            </option>
                                        ))}
                                    </Select>
                                </Box>
                                <Box style={{ fontSize: "14px", fontWeight: "bold", }}>
                                    Warehouse
                                    <Select
                                        name="warehouse_id"
                                        fontSize="14px"
                                        height="40px"
                                        value={formData.warehouse_id}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled>
                                            Select a warehouse
                                        </option>
                                        {warehouses.map((warehouse) => (
                                            <option key={warehouse.id} value={warehouse.id}>
                                                {warehouse.title}
                                            </option>
                                        ))}
                                    </Select>
                                </Box>
                                <Box style={{ fontSize: "14px", fontWeight: "bold", }}>
                                    Status
                                    <Select
                                        name="status"
                                        fontSize="14px"
                                        height="40px"
                                        value={formData.status}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Success">Success</option>
                                    </Select>
                                </Box>
                                <Box style={{ fontSize: "14px", fontWeight: "bold", }}>
                                    Items
                                    <Select
                                        name="items"
                                        fontSize="14px"
                                        height="40px"
                                        value={formData.items.map((item) => item.id)}
                                        onChange={handleChange}
                                        required
                                        isMulti
                                    >
                                        <option value="" disabled>
                                            Select items
                                        </option>
                                        {items.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.title}
                                            </option>
                                        ))}
                                    </Select>
                                </Box>
                                {formData.items.map((selectedItem, index) => (
                                    <div key={selectedItem.id}>
                                        <Box style={{ fontSize: "14px", fontWeight: "bold", }}>
                                            Quantity for {selectedItem.title}
                                            <Input
                                                type="number"
                                                fontSize="14px"
                                                height="40px"
                                                mb={10}
                                                name="quantity"
                                                value={selectedItem.quantity}
                                                onChange={(e) => handleChange({ target: { name: "quantity", value: e.target.value, id: selectedItem.id } })}
                                                required
                                            />
                                            <Box style={{ fontSize: "14px", fontWeight: "bold", }}>
                                                Price
                                                <Input
                                                    type="number"
                                                    fontSize="14px"
                                                    height="40px"
                                                    mb={10}
                                                    textColor={"black"}
                                                    value={selectedItem.price}
                                                    readOnly
                                                />
                                            </Box>
                                        </Box>
                                    </div>
                                ))}
                                <Flex justifyContent="flex-start" >
                                    <Button
                                        type="submit"

                                        colorScheme="messenger"
                                        fontSize="md"
                                        mr={5}
                                        p={7}
                                    >
                                        Add Supply Orders
                                    </Button>
                                    <Link to="/supplier-orders">
                                        <Button variant="outline" colorScheme="blue" p={7}>
                                            Back to Supply Orders
                                        </Button>
                                    </Link>
                                </Flex>
                            </SimpleGrid>
                        </form>
                    </Box>
                </Box>
            </Box>
        </div >

    );
};

export default AddSupplyOrders;
