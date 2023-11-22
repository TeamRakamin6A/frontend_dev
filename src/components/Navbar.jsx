import {
  Box, Button, Flex, Image, Text, Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import logo from "../assets/Rectangle3.png";
import profile from "../assets/profile.png"
import { TfiWorld } from "react-icons/tfi";
import { FaAlignJustify, FaRegPlusSquare, FaRegBell, FaRegEnvelope } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [placement] = useState('left')
  return (
    <Flex
      w={"full"}
      as={"nav"}
      align={"center"}
      justify={"space-between"}
      wrap={"wrap"}
      padding={"12px"}
      bg={"#F9F9F9"}
      color={"black"}
      borderBottom={'2px solid #D9D9D9'}
    >
      <Box display={'flex'} alignItems={'center'}>
        <Button mr={"20px"} onClick={onOpen}>
          <FaAlignJustify fontSize={"30px"} />
        </Button>
        <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
            <DrawerBody>
              {/* fill body */}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Image src={logo} w={'50px'} mr={'8px'} />
        <Text fontWeight={"extrabold"}><Box display={'inline'} as="span" color={"blue"}>STOCK</Box> WISE</Text>
      </Box>
      <Box display={'flex'} alignItems={"center"}>
        <Box fontSize={"30px"} mr={"20px"} pr={"20px"} borderRight={'3px solid #D9D9D9'}>
          <FaRegPlusSquare />
        </Box>
        <Box fontSize={"30px"} display={'flex'} gap={'10px'} pr={"20px"} borderRight={'3px solid #D9D9D9'}>
          <FaRegBell />
          <TfiWorld />
          <FaRegEnvelope />
        </Box>
        <Box ml={"20px"} display={'flex'} alignItems={"center"}>
          <Image src={profile} mr={'10px'} />
          <Text>
            Profile <br />
            admin
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default Navbar;
