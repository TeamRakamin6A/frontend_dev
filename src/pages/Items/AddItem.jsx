import { ChevronRightIcon } from "@chakra-ui/icons"
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, FormControl, FormLabel, Input, Select, Text, VStack } from "@chakra-ui/react"
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { createItem, uploadImage } from "../../fetching/item"
import { useNavigate } from "react-router-dom"
import { getAllCategories } from "../../fetching/category"
import { MultiSelect } from "react-multi-select-component";

const AddItem = () => {
    const navigate = useNavigate();
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
                const res = await getAllCategories()
                console.log(res);
                setCategories(res.data)
            } catch (error) {
                console.log(error);
            }
        }

        fetchCategories()
    }, [])

    const name = "Add Product"

    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles[0]);
        setSelectedImage(acceptedFiles[0])
    }, [])
    const { getRootProps, getInputProps } = useDropzone({ onDrop })


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = name === 'category_ids' && name === 'price' ? parseInt(value) : value;
        setDataItem({ ...dataItem, [name]: parsedValue });
    };

    const handleSubmit = async () => {
        try {
            setDataItem({ ...dataItem, category_ids: selected })
            const res = await createItem(dataItem)
            if (selectedImage) {
                const upload = await uploadImage(res.data.id, selectedImage);
                console.log(upload);
            } else {
                console.log('No image selected');
            }
            setSelectedImage("")
            alert(res.message)
            navigate("/products")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box w={'full'} h={'100vh'} bg={'#F3F3F3'} >
            <Box w={'full'} bgColor={'#FFFFFF'} padding={'28px'} shadow={'lg'}>
                <Text fontWeight={'extrabold'} fontSize={'25px'}>{name}</Text>
                <Breadcrumb spacing='8px' color={'#AAAAAA'} separator={<ChevronRightIcon color='gray.500' />}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/products'>Product</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='#'>{name}</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Box>
            <Box padding={'22px'} margin={'20px'} bgColor={'#FFFFFF'} pb={'80px'} shadow={'lg'}>
                <Text fontWeight={'extrabold'} fontSize={'25px'} mt={'20px'}>{name}</Text>
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
                            {/* <Input placeholder='Category' onChange={handleInputChange} name="category_ids" size='lg' /> */}
                            {/* <Select placeholder='Select option'>
                                {categories?.map((cat) => {
                                    return (
                                        <option key={cat.id} value={cat.id}>{cat.title}</option>
                                    )
                                })}
                            </Select> */}

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
                    <Box w={'296px'} rounded={'20px'} border={'2px dashed #2C6BE5'} bgColor={'#E7EFFF'} {...getRootProps()}>
                        <Flex justifyContent={'center'} h={'407px'} alignItems={'center'}>
                            <VStack>
                                <Text fontWeight={'bold'} align={'center'} fontSize={'32px'}>Drop product image here Or</Text>
                                <Flex justify={'center'} align={'center'} rounded={'10px'} w={'150px'} h={'57px'} bgColor={'#2C6AE5'}>
                                    <FormLabel fontSize={'18px'} color={'white'} fontWeight={'bold'}>Input File</FormLabel>
                                </Flex>
                                <Input type="file" id="file" h={'40px'} placeholder="Browse File" hidden {...getInputProps()} />
                            </VStack>
                        </Flex>
                    </Box>

                </Flex>
                <Box display={'flex'} justifyContent={'center'}>
                    <Button onClick={handleSubmit} w={'194px'} h={'57px'} bgColor={'#2C6AE5'} color={'white'}>Create Product</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default AddItem