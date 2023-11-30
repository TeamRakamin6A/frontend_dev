import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  Select,
  Text,
  useToast,
  Center,
  Flex
} from "@chakra-ui/react";
import { registerUser } from "../fetching/user";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      return;
    }
    try {
      await registerUser(
        name,
        email,
        username,
        password,
        role
      );
      toast({
        title: "Registered",
        description: "You have successfully registered.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/login");
    } catch (e) {
      const errorMessage = e?.message || "An error occurred. Please try again.";
      setError(errorMessage);
      toast({
        title: "An error occurred.",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box className="container" display={'flex'} h={'100vh'} justifyContent={'center'} alignItems={'center'}>
      <Box py={9} px={'200'} mx="150" mt={2}>
        <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'} border={'2px solid #CCC9C9'} borderRadius="lg" p={10}>
          <img src="../Stock Wise.png" width={320} height={320} />
          <form>
            {error && (
              <Box color="red.500" mb={8}>
                {error}
              </Box>
            )}

            <FormControl isRequired mt={8}>
              <Input w={'480px'} h={"55px"} border={'2px solid #CCC9C9'} type="name" name="name" placeholder="Name" onChange={(e) => setName(e.target.value)} />
            </FormControl>

            <FormControl isRequired mt={4} onChange={(e) => setEmail(e.target.value)}>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                w={'480px'} h={"55px"} border={'2px solid #CCC9C9'}
              />
            </FormControl>

            <FormControl isRequired mt={4} >
              <Input w={'480px'} h={"55px"} border={'2px solid #CCC9C9'} type="name" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            </FormControl>

            <FormControl isRequired mt={4}>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                w={'480px'} h={"55px"} border={'2px solid #CCC9C9'}
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                w={'480px'} h={"55px"} border={'2px solid #CCC9C9'}
              />
              {password !== confirmPassword && (
                <Text fontSize="xs" color="red.500">
                  The password does not match.
                </Text>
              )}
            </FormControl>

            <FormControl isRequired mt={4}>
              <Select placeholder="Select Role" onChange={(e) => setRole(e.target.value)} w={'480px'} h={"55px"} border={'2px solid #CCC9C9'}>
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </Select>
            </FormControl>

            <Button mt={8} w={'full'} h={"55px"} color={'blue'} type="button" onClick={handleSubmit}>
              Register
            </Button>
          </form>
          <Text mt={'20px'}>Have an account? <Link to={"/login"}><Box display={'inline'} color={'blue'} _hover={{ textDecoration: 'underline' }}>Login</Box></Link></Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default Register;
