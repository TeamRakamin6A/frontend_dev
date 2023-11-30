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
import { updateUser } from "../fetching/user";
import { Link, useNavigate } from "react-router-dom";


const ForgetPassword = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const [formInput, setFormInput] = useState({
        email: '',
        oldPassword: '',
        newPassword: '',
        confirm: ''
    })

    const handleChangeForm = (e) => {
        setFormInput({
            ...formInput,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async () => {
        if (formInput.newPassword !== formInput.confirm) {
            toast({
                title: "Password mismatch",
                description: "The new passwords do not match.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            const payload = {
                email: formInput.email,
                oldPassword: formInput.oldPassword,
                newPassword: formInput.newPassword
            }
            console.log(payload);
            const res = await updateUser(payload)
            toast({
                title: "Success",
                description: res.message || "Failed to reset password. Please try again.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            navigate('/login');
        } catch (error) {
            console.log(error);
            toast({
                title: "Error",
                description: error.response.data.message || "Failed to reset password. Please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    }
    return (
        <Box className="container" display={'flex'} h={'100vh'} justifyContent={'center'} alignItems={'center'}>
            <Box py={9} px={'200'} mx="150" mt={2}>
                <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'} border={'2px solid #CCC9C9'} borderRadius="lg" p={10}>
                    <img src="../Stock Wise.png" width={320} height={320} />
                    <form>

                        <FormControl isRequired mt={4} onChange={handleChangeForm}>
                            <Input
                                type="email"
                                name="email"
                                placeholder="Email"
                                w={'480px'} h={"55px"} border={'2px solid #CCC9C9'}
                            />
                        </FormControl>

                        <FormControl isRequired mt={4}>
                            <Input
                                type="password"
                                placeholder="Old Password"
                                name="oldPassword"
                                onChange={handleChangeForm}
                                w={'480px'} h={"55px"} border={'2px solid #CCC9C9'}
                            />
                        </FormControl>

                        <FormControl isRequired mt={4}>
                            <Input
                                type="password"
                                placeholder="New password"
                                name="newPassword"
                                onChange={handleChangeForm}
                                w={'480px'} h={"55px"} border={'2px solid #CCC9C9'}
                            />

                        </FormControl>

                        <FormControl isRequired mt={4}>
                            <Input
                                type="password"
                                name="confirm"
                                placeholder="Confirm New Password"
                                onChange={handleChangeForm}
                                w={'480px'} h={"55px"} border={'2px solid #CCC9C9'}
                            />
                        </FormControl>

                        <Button mt={8} w={'full'} h={"55px"} color={'blue'} type="button" onClick={handleSubmit}>
                            Register
                        </Button>
                    </form>
                    <Box mt={'20px'}>Have an account? <Link to={"/login"}><Box display={'inline'} color={'blue'} _hover={{ textDecoration: 'underline' }}>Login</Box></Link></Box>
                </Flex>
            </Box>
        </Box>
    )
}

export default ForgetPassword