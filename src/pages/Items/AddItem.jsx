import { Box, Button, Flex, FormControl, FormLabel, Input, Text, VStack, useToast } from "@chakra-ui/react"
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { createItem, uploadImage } from "../../fetching/item"
import { useNavigate } from "react-router-dom"
import { getAllCategories } from "../../fetching/category"
import { MultiSelect } from "react-multi-select-component";
import Navbar from "../../components/Navbar"
import CustomHeader from "../../components/Boxtop"
import Footer from "../../components/Footer";

const AddItem = () => {
    const navigate = useNavigate();
    const toast = useToast()
    const [categories, setCategories] = useState([])
    const [selectedImage, setSelectedImage] = useState('')
    const [selected, setSelected] = useState([]);
    const [dataItem, setDataItem] = useState({
        title: '',
        description: '',
        category_ids: [],
        sku: '',
        price: ''
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getAllCategories(1, 100, '')
                setCategories(res.data)
            } catch (error) {
                console.log(error);
            }
        }

        fetchCategories()
    }, [])


    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles[0]) {
            toast({
                title: "Success",
                description: "image successfully included",
                status: "success",
                position: "top",
                duration: 3000,
                isClosable: true,
            });
        }
        setSelectedImage(acceptedFiles[0])
    }, [toast])
    const { getRootProps, getInputProps } = useDropzone({ onDrop })


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = name === 'category_ids' && name === 'price' ? parseInt(value) : value;
        setDataItem({ ...dataItem, [name]: parsedValue });
    };

    const handleSubmit = async () => {
        try {
            const optionItem = { ...dataItem, category_ids: selected.map((opt) => opt.value) }
            const res = await createItem(optionItem)
            if (selectedImage) {
                const imageFile = { image: selectedImage }
                await uploadImage(res.data.id, imageFile);
            }
            toast({
                title: "Success",
                description: res.message,
                status: "success",
                position: "top",
                duration: 3000,
                isClosable: true,
            });
            setSelectedImage("")
            navigate("/products")
        } catch (error) {
            console.log(error);
            toast({
                title: "Error",
                description: error.response.data.message,
                status: "error",
                position: "top",
                duration: 3000,
                isClosable: true,
            });
        }
    }

    return (
        <>
            <Navbar />
            <Box w={'full'} bg={'#F3F3F3'} >
                <CustomHeader title={'Product'} subtitle={'Edit Product'} href={'products'} subhref={`products/add-products`} />

                <Box padding={'22px'} margin={'20px'} bgColor={'#FFFFFF'} pb={'80px'} shadow={'lg'}>
                    <Text fontWeight={'extrabold'} fontSize={'25px'} mt={'20px'}>Add Product</Text>
                    <Flex gap={'50px'} justify={'center'} mt={'30px'}>
                        <Box w={'392px'}>
                            <FormControl>
                                <FormLabel fontSize={'18px'} fontWeight={'bold'}>Product Name</FormLabel>
                                <Input placeholder='Product Name' onChange={handleInputChange} name="title" size='lg' />
                            </FormControl>
                            <FormControl mt={'20px'}>
                                <FormLabel fontSize={'18px'} fontWeight={'bold'}>Description</FormLabel>
                                <Input placeholder='Description' onChange={handleInputChange} name="description" size='lg' />
                            </FormControl>
                            <FormControl mt={'20px'}>
                                <FormLabel fontSize={'18px'} fontWeight={'bold'}>Category</FormLabel>
                                <MultiSelect options={categories?.map((cat) => ({
                                    label: cat.title,
                                    value: cat.id
                                }))} labelledBy="Search Product" onChange={setSelected} value={selected} />
                            </FormControl>
                        </Box>
                        <Box w={'392px'}>
                            <FormControl>
                                <FormLabel fontSize={'18px'} fontWeight={'bold'}>SKU</FormLabel>
                                <Input placeholder='SKU' onChange={handleInputChange} name="sku" size='lg' />
                            </FormControl>
                            <FormControl mt={'20px'}>
                                <FormLabel fontSize={'18px'} fontWeight={'bold'}>Product Price</FormLabel>
                                <Input placeholder='Product Price' type="number" onChange={handleInputChange} name="price" size='lg' />
                            </FormControl>
                            <FormControl mt={'20px'}>
                                <FormLabel fontSize={'18px'} fontWeight={'bold'}>Keywords</FormLabel>
                                <Input placeholder='Keywords' onChange={handleInputChange} name="keywords" size='lg' />
                            </FormControl>
                        </Box>
                        <Box w={'296px'} rounded={'20px'} border={'2px dashed #0090CD'} bgColor={'#E7EFFF'} {...getRootProps()}>
                            <Flex justifyContent={'center'} h={'407px'} alignItems={'center'}>
                                <VStack>
                                    <Text fontWeight={'bold'} align={'center'} fontSize={'32px'}>Drop product image here Or</Text>
                                    <Flex justify={'center'} align={'center'} rounded={'10px'} w={'150px'} h={'57px'} bgColor={'#0090CD'}>
                                        <FormLabel fontSize={'18px'} color={'white'} fontWeight={'bold'}>Input File</FormLabel>
                                    </Flex>
                                    <Input type="file" id="file" h={'40px'} placeholder="Browse File" hidden {...getInputProps()} />
                                </VStack>
                            </Flex>
                        </Box>

                    </Flex>
                    <Box display={'flex'} justifyContent={'center'}>
                        <Button onClick={handleSubmit} w={'194px'} h={'57px'} colorScheme="linkedin">Create Product</Button>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    )
}

export default AddItem