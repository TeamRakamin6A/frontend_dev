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
} from "@chakra-ui/react";
import { registerUser } from "../fetching/user";
import { useNavigate } from "react-router-dom";

const hexaColor = {
  colorSubmit: '#44AADA'
}

const Register = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    }
    try {
      await registerUser(
        e.target.name.value,
        e.target.email.value,
        e.target.username.value,
        e.target.role.value,
        password
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
      <Box w="full" py={9} px={'200'} mx="150" mt={2}>
        <Box borderWidth="1px" borderRadius="lg" p={10}>
          <img src="../Stock Wise.png" width={250} height={250} alt="center"  style={{marginLeft: 150}}/>
          <form onSubmit={handleSubmit}>
            {error && (
              <Box color="red.500" mb={8}>
                {error}
              </Box>
            )}

            <FormControl isRequired mt={8}>
              <Input type="name" name="name" placeholder="Name" />
            </FormControl>

            <FormControl isRequired mt={4}>
              <Input
                type="email"
                name="email"
                placeholder="Email"
              />
            </FormControl>

            <FormControl isRequired mt={4} >
              <Input type="name" name="username" placeholder="Username" />
            </FormControl>

            <FormControl isRequired mt={4}>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {password !== confirmPassword && (
                <Text fontSize="xs" color="red.500">
                  The password does not match.
                </Text>
              )}
            </FormControl>

            <FormControl isRequired>
              <Input type="text" name="role" placeholder="Role" mt={4} />
            </FormControl>

            <Button mt={8} ml={20} color={hexaColor.colorSubmit} type="submit" >
              Register
            </Button>
          </form>
        </Box>
      </Box>
    </div>
  );
};

export default Register;
