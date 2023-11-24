import { ChevronRightIcon } from "@chakra-ui/icons"
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, FormControl, FormLabel, Input, Text } from "@chakra-ui/react"

const AddItem = () => {
    return (
        <Box w={'full'} h={'100vh'} bg={'#F3F3F3'} >
            <Box w={'full'} bgColor={'#FFFFFF'} padding={'28px'} shadow={'lg'}>
                <Text fontWeight={'extrabold'} fontSize={'25px'}>Add Product</Text>
                <Breadcrumb spacing='8px' color={'#AAAAAA'} separator={<ChevronRightIcon color='gray.500' />}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/products'>Product</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='#'>Add Product</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Box>
            <Box padding={'22px'} margin={'20px'} bgColor={'#FFFFFF'}>
                <Text fontWeight={'extrabold'} fontSize={'25px'} mt={'20px'}>Add Product</Text>
                <Flex gap={'50px'} justify={'center'} >
                    <Box w={'392px'}>
                        <FormControl>
                            <FormLabel>Product Name</FormLabel>
                            <Input placeholder='Product Name' />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Input placeholder='Description' />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Category</FormLabel>
                            <Input placeholder='Category' />
                        </FormControl>
                    </Box>
                    <Box w={'392px'}>
                        <FormControl>
                            <FormLabel>SKU</FormLabel>
                            <Input placeholder='SKU' />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Product Price</FormLabel>
                            <Input placeholder='Product Price' />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Keywords</FormLabel>
                            <Input placeholder='Keywords' />
                        </FormControl>
                    </Box>
                    <Box w={'296px'} rounded={'20px'} border={'2px dashed #2C6BE5'} h={'407px'} bgColor={'#E7EFFF'}>

                    </Box>
                </Flex>
            </Box>
        </Box>
    )
}

export default AddItem