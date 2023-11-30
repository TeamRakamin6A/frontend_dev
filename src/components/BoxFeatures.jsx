import React from "react";
import { Box, Heading, Image, Text } from "@chakra-ui/react";

const FeatureItem = ({ image, title, description }) => {
    return (
        <Box
            bg="#F9F9F9"
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
            boxShadow="lg"
            p={10}
            borderRadius={20}
        >
            <Image src={image} />
            <Heading fontSize={20} color={"#223965"} mt={2} mb={4}>{title}</Heading>
            <Text fontSize={16}>{description}</Text>
        </Box>
    );
};

export default FeatureItem;
