import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
  Center
} from "@chakra-ui/react";
import { login } from "../fetching/user";
import { useNavigate } from "react-router-dom";

const hexaColor = {
  colorSubmit: '#44AADA'
}


  
const Login = () => {

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();
  const [emailOrUsername, setEmailorUsername] = useState("")
  const [password, setPassword] = useState("") 

  const handleSubmit = async (e) => {
    try {
      await login({
        emailOrUsername,
        password
      }
      );
      toast({
        title: "Login Success",
        description: "Welcome",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } catch (e) {
      const error = new Error(e);
      toast({
        title: "An error occurred.",
        description: error?.message || "An error occurred. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    };
    setError(error?.message || console.error());
  };

  return (

    <div className="container" style={{justifyContent: 'center'}}>
      <Center>
      <Box w="full" py={9} px={'200'} mx="150" mt={2}>
        <Box borderWidth="1px" borderRadius="lg" p={10}>
          <img src="../Stock Wise.png" width={250} height={250} alt="center"  style={{marginLeft: 150}}/>
          <form>
            {error && (
              <Box color="red.500" mb={8}>
                {error}
              </Box>
            )}

            <FormControl isRequired mt={8}>
              <Input type="name" name="emailOrUsername" placeholder="Input Your Username / Email" onChange={(e) => setEmailorUsername(e.target.value)}/>
            </FormControl>

            <FormControl isRequired mt={8}>
              <Input type="password" name="password" placeholder="Input Your Password" onChange={(e) => setPassword(e.target.value)}/>
            </FormControl>
            <Button mt={8} color={hexaColor.colorSubmit} type="button" onClick={handleSubmit}>
              Login
            </Button>
          </form>
        </Box>
      </Box>
      </Center>

    </div>
  );
};

export default Login;
