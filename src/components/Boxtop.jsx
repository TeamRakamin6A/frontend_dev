import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const CustomHeader = ({ title, subtitle }) => (
    <Box
        backgroundColor="white"
        width="100%"
        minHeight="100px"
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        paddingLeft="20px"
    >
        <Box>
            <Heading size="md" mb={2}>
                {title}
            </Heading>
            <Text>{subtitle}</Text>
        </Box>
    </Box>
);

export default CustomHeader;
