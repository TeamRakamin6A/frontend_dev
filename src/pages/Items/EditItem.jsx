import { Box, Button, Flex, FormControl, FormLabel, Input, Text, VStack, useToast } from "@chakra-ui/react"
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { updateItem, uploadImage } from "../../fetching/item"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { MultiSelect } from "react-multi-select-component"
import { getAllCategories } from "../../fetching/category"
import Navbar from "../../components/Navbar"
import CustomHeader from "../../components/Boxtop"
import Footer from "../../components/Footer";

const EditItem = () => {
    const { id } = useParams();
    const location = useLocation();
    const { productData } = location.state;
    const navigate = useNavigate()
    const toast = useToast()
    const [selectedImage, setSelectedImage] = useState('')
    const [categories, setCategories] = useState([])
    const [selected, setSelected] = useState([]);
    const [dataItem, setDataItem] = useState({
        title: productData.title || '',
        description: productData.description || '',
        category_ids: [],
        sku: productData.sku || '',
        price: productData.price || ''
    });


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getAllCategories(1, 100, '')
                console.log(res);
                setCategories(res.data)
            } catch (error) {
                console.log(error);
            }
        }

        fetchCategories()
    }, [])

    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles[0]);
        if (!acceptedFiles[0]) {
            setSelectedImage(productData.image_url)
        } else {
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
    }, [productData.image_url, toast])
    const { getRootProps, getInputProps } = useDropzone({ onDrop })


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = name === 'category_ids' || name === 'price' ? parseInt(value) : value;
        setDataItem({ ...dataItem, [name]: parsedValue });
    };

    console.log(dataItem);

    const handleSubmit = async () => {
        try {
            let optionItem = { ...dataItem, category_ids: selected.map((opt) => opt.value) }
            const res = await updateItem(+id, optionItem)
            if (selectedImage) {
                const imageFile = { image: selectedImage }
                await uploadImage(productData.id, imageFile);
            }
            console.log(res);
            setSelectedImage("")
            toast({
                title: "Success",
                description: res.message,
                status: "success",
                position: "top",
                duration: 3000,
                isClosable: true,
            });
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
                <CustomHeader title={'Product'} subtitle={'Edit Product'} href={'products'} subhref={`products/edit-products/${id}`} />
                <Box padding={'22px'} margin={'20px'} bgColor={'#FFFFFF'} pb={'80px'} shadow={'lg'}>
                    <Text fontWeight={'extrabold'} fontSize={'25px'} mt={'20px'}>Edit Product</Text>
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
                                {/* <Input placeholder='Category' defaultValue={productData.Categories[0].id} onChange={handleInputChange} name="category_ids" size='lg' /> */}
                                <MultiSelect options={categories?.map((cat) => ({
                                    label: cat.title,
                                    value: cat.id
                                }))} labelledBy="Search Product" onChange={setSelected} value={selected} />
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
                        <Box w={'296px'} rounded={'20px'} border={'2px dashed #0090CD'} bgColor={'#E7EFFF'} {...getRootProps()}>
                            <Flex justifyContent={'center'} h={'407px'} alignItems={'center'}>
                                <VStack>
                                    <Text fontWeight={'bold'} align={'center'} fontSize={'32px'}>Drop product image here Or</Text>
                                    <Flex justify={'center'} align={'center'} rounded={'10px'} w={'150px'} h={'57px'} bgColor={'#0090CD'}>
                                        <FormLabel fontSize={'18px'} color={'white'} fontWeight={'bold'} htmlFor={'file'}>Input File</FormLabel>
                                    </Flex>
                                    <Input type="file" id="file" h={'40px'} placeholder="Browse File" hidden  {...getInputProps()} />
                                </VStack>
                            </Flex>
                        </Box>

                    </Flex>
                    <Box display={'flex'} justifyContent={'center'}>
                        <Button onClick={handleSubmit} w={'194px'} h={'57px'} colorScheme="linkedin">Update Product</Button>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>

    )
}

export default EditItem