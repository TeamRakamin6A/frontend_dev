import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/breadcrumb";
import { ChevronRightIcon } from "@chakra-ui/icons";

const CustomHeader = ({ title, subtitle, href, subhref }) => {
    return (
        <Box w={'full'} bgColor={'#FFFFFF'} padding={'28px'} shadow={'lg'}>
            <Text fontWeight={'extrabold'} fontSize={'22px'}>{title}</Text>
            <Breadcrumb spacing='8px' color={'#AAAAAA'} separator={<ChevronRightIcon color='gray.500' />}>
                <BreadcrumbItem>
                    <BreadcrumbLink href={`/${href}`}>{title}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbLink href={`/${subhref}`}>{subtitle}</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
        </Box>
    )
};

export default CustomHeader;
