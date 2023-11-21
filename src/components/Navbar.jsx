import { Flex, Image } from "@chakra-ui/react";
import image1 from "../assets/Rectangle4.png"
import image2 from "../assets/Rectangle3.png"
import image3 from "../assets/icon-menu.png"


const Navbar = () => {
  return <Flex w={'100vw'}>
    <Image src={image3} />
    <Image src={image2} />
    <Image src={image1} />
  </Flex>;
};

export default Navbar;
