import {
  Box, Button, Flex, Image, Text, Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
} from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons'
import logo from "../assets/Rectangle3.png";
import profile from "../assets/profile.png"
import { TfiWorld } from "react-icons/tfi";
import { FaAlignJustify, FaMoneyCheckAlt, FaWarehouse, FaRegPlusSquare, FaUserFriends, FaRegBell, FaRegEnvelope, FaBox, FaUser, FaHome } from "react-icons/fa";
import { useEffect, useState } from "react";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { MdPayments } from "react-icons/md";
import { getUserLogin } from "../fetching/user";
import DrawerDetail from "./DrawerDetail";


const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [placement] = useState('left')
  const [data, setData] = useState('null')
  const navigate = useNavigate()

  const fetchUser = async () => {
    try {
      const data = await getUserLogin()
      setData(data.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const logOut = () => {
    localStorage.removeItem('token')
    navigate('/home')
  }

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
            <DrawerHeader borderBottomWidth='1px'>
              <HStack>
                <Image src={logo} w={'50px'} mr={'8px'} />
                <Text fontWeight={"extrabold"}><Box display={'inline'} as="span" color={"blue"}>STOCK</Box> WISE</Text>
              </HStack>
            </DrawerHeader>
            <DrawerBody>
              <Flex justify={'center'} direction={'column'} gap={'30px'} mt={'20px'}>
                <DrawerDetail name={'Home'}>
                  <FaHome color={'#3876BF'} fontSize={'30px'} />
                </DrawerDetail>
                <DrawerDetail name={'Product'} nav={'products'}>
                  <FaBox color={'#3876BF'} fontSize={'30px'} />
                </DrawerDetail>
                <DrawerDetail name={'Supplier'} nav={'suppliers'}>
                  <FaUser color={'#3876BF'} fontSize={'30px'} />
                </DrawerDetail>
                <DrawerDetail name={'Customer'} nav={'customers'}>
                  <FaUserFriends color={'#3876BF'} fontSize={'30px'} />
                </DrawerDetail>
                <DrawerDetail name={'Warehouse'} nav={'warehouses'}>
                  <FaWarehouse color={'#3876BF'} fontSize={'30px'} />
                </DrawerDetail>
                <DrawerDetail name={'Category'} nav={'categories'}>
                  <BiSolidCategoryAlt color={'#3876BF'} fontSize={'30px'} />
                </DrawerDetail>
                <DrawerDetail name={'Order'} nav={'orders'}>
                  <MdPayments color={'#3876BF'} fontSize={'30px'} />
                </DrawerDetail>
                <DrawerDetail name={'Supply Order'} nav={'supplier-orders'}>
                  <FaMoneyCheckAlt color={'#3876BF'} fontSize={'30px'} />
                </DrawerDetail>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Box onClick={() => navigate('/')} display={'flex'} alignItems={'center'}>
          <Image src={logo} w={'50px'} mr={'8px'} />
          <Text fontWeight={"extrabold"}><Box display={'inline'} as="span" color={"blue"}>STOCK</Box> WISE</Text>
        </Box>
      </Box>
      <Box display={'flex'} alignItems={"center"}>
        <Box fontSize={"30px"} mr={"20px"} pr={"20px"} onClick={() => navigate('/add-products')} borderRight={'3px solid #D9D9D9'}>
          <FaRegPlusSquare />
        </Box>
        <Box fontSize={"30px"} display={'flex'} gap={'10px'} pr={"20px"} borderRight={'3px solid #D9D9D9'}>
          <FaRegBell />
          <TfiWorld />
          <FaRegEnvelope />
        </Box>
        <Menu>
          <MenuButton as={Button} ml={'20px'} p={'10px'} rightIcon={<ChevronDownIcon />}>
            <HStack>
              <Image src={profile} mr={'10px'} />
              <Text fontSize={'12px'}>
                {data?.username} <br />
                {data?.role}
              </Text>
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={logOut}>Log Out</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default Navbar;
