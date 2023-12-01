import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  useToast,
  Center,
  Flex,
  Text
} from "@chakra-ui/react";
import { login } from "../fetching/user";
import { Link, useNavigate } from "react-router-dom";



const Login = () => {

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();
  const [emailOrUsername, setEmailorUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async () => {
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
    }
    setError(error?.message || console.error());
  };

  return (

    <Box className="container" display={'flex'} h={'100vh'} justifyContent={'center'} alignItems={'center'}>
      <Box py={9} px={'200'} mx="150" mt={2}>
        <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'} border={'2px solid #CCC9C9'} borderRadius="lg" p={10}>
          <img src="../Stock Wise.png" width={320} height={320} alt="center" />
          <form>
            {error && (
              <Box color="red.500" mb={2}>
                {error}
              </Box>
            )}

            <FormControl isRequired mt={8}>
              <Input w={'480px'} h={"55px"} border={'2px solid #CCC9C9'} type="name" name="emailOrUsername" placeholder="Input Your Username / Email" onChange={(e) => setEmailorUsername(e.target.value)} />
            </FormControl>

            <FormControl isRequired mt={6}>
              <Input w={'480px'} h={"55px"} border={'2px solid #CCC9C9'} type="password" name="password" placeholder="Input Your Password" onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Box color={'blue'} mt={'20px'} _hover={{ textDecoration: 'underline' }}> <Link to={"/forget"}>Forget Password?</Link></Box>
            <Button mt={8} h={"55px"} w={'full'} color={"blue"} type="button" onClick={handleSubmit}>
              Login
            </Button>
          </form>
          <Box mt={'20px'}>Have not an account? <Link to={"/register"}><Box display={'inline'} color={'blue'} _hover={{ textDecoration: 'underline' }}>Register</Box></Link></Box>
          <Box mt={'20px'} _hover={{ textDecoration: 'underline' }}> <Link to={"/home"}>Back to Home</Link></Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Login;
