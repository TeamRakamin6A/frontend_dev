import { ChevronRightIcon } from "@chakra-ui/icons"
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, FormControl, FormLabel, Input, Text, VStack } from "@chakra-ui/react"
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { updateItem, uploadImage } from "../../fetching/item"
import { useLocation, useNavigate, useParams } from "react-router-dom"

const EditItem = () => {
    const { id } = useParams();
    const location = useLocation();
    const { productData } = location.state;
    const name = id ? "Edit Product" : "Add Product"
    const navigate = useNavigate()

    const [selectedImage, setSelectedImage] = useState('')
    const [dataItem, setDataItem] = useState({
        title: productData.title || '',
        description: productData.description || '',
        category_ids: productData.Categories[0].id || '',
        sku: productData.sku || '',
        price: productData.price || ''
    });


    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles[0]);
        if (!acceptedFiles) {
            setSelectedImage(productData.image_url)
        }
        setSelectedImage(acceptedFiles[0])
    }, [productData.image_url])
    const { getRootProps, getInputProps } = useDropzone({ onDrop })


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = name === 'category_ids' || name === 'price' ? parseInt(value) : value;
        setDataItem({ ...dataItem, [name]: parsedValue });
    };

    console.log(dataItem);

    const handleSubmit = async () => {
        try {
            const res = await updateItem(+id, dataItem)
            if (selectedImage) {
                const upload = await uploadImage(productData.id, selectedImage);
                console.log(upload);
            } else {
                console.log('No image selected');
            }
            console.log(res);
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
                            <Input placeholder='Product Name' defaultValue={productData?.title} onChange={handleInputChange} name="title" size='lg' />
                        </FormControl>
                        <FormControl mt={'20px'}>
                            <FormLabel fontSize={'18px'} fontWeight={'bold'}>Description</FormLabel>
                            <Input placeholder='Description' defaultValue={productData?.description} onChange={handleInputChange} name="description" size='lg' />
                        </FormControl>
                        <FormControl mt={'20px'}>
                            <FormLabel fontSize={'18px'} fontWeight={'bold'}>Category</FormLabel>
                            <Input placeholder='Category' defaultValue={productData?.Categories[0].id} onChange={handleInputChange} name="category_ids" size='lg' />
                        </FormControl>
                    </Box>
                    <Box w={'392px'}>
                        <FormControl>
                            <FormLabel fontSize={'18px'} fontWeight={'bold'}>SKU</FormLabel>
                            <Input placeholder='SKU' defaultValue={productData?.sku} onChange={handleInputChange} name="sku" size='lg' />
                        </FormControl>
                        <FormControl mt={'20px'}>
                            <FormLabel fontSize={'18px'} fontWeight={'bold'}>Product Price</FormLabel>
                            <Input placeholder='Product Price' defaultValue={productData?.price} type="number" onChange={handleInputChange} name="price" size='lg' />
                        </FormControl>
                        <FormControl mt={'20px'}>
                            <FormLabel fontSize={'18px'} fontWeight={'bold'}>Keywords</FormLabel>
                            <Input placeholder='Keywords' defaultValue={productData?.keywords} onChange={handleInputChange} name="keywords" size='lg' />
                        </FormControl>
                    </Box>
                    <Box w={'296px'} rounded={'20px'} border={'2px dashed #2C6BE5'} bgColor={'#E7EFFF'} {...getRootProps()}>
                        <Flex justifyContent={'center'} h={'407px'} alignItems={'center'}>
                            <VStack>
                                <Text fontWeight={'bold'} align={'center'} fontSize={'32px'}>Drop product image here Or</Text>
                                <Flex justify={'center'} align={'center'} rounded={'10px'} w={'150px'} h={'57px'} bgColor={'#2C6AE5'}>
                                    <FormLabel fontSize={'18px'} color={'white'} fontWeight={'bold'} htmlFor={'file'}>Input File</FormLabel>
                                </Flex>
                                <Input type="file" id="file" h={'40px'} placeholder="Browse File" hidden  {...getInputProps()} />
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

export default EditItem