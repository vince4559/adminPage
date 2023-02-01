import { FormControl, Input, VStack, FormLabel, Button, useToast, } from '@chakra-ui/react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/FireBaseConfig';


const Login = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('');
    const toast = useToast()
    const navigate = useNavigate()


    const handleLogin = async() => {
       try {
        const result = await signInWithEmailAndPassword(auth, email, password);
       toast({
        title: `Login as ${result.user.email}`,
        description: "Login was successfull",
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
      navigate('/')
       } catch (error) {
        toast({
            title: `${error.message}`,
            description: "error login in",
            status: 'error',
            duration: 4000,
            isClosable: true,
          })
       }
    }
  return (
   
   <VStack mt={'2rem'} >
   <FormControl w={'50%'} isRequired>
        <FormLabel>Email:</FormLabel>
        <Input type='email' placeholder='Enter Your Email'
        value={email} 
        name='email' 
        onChange={(e) => setemail(e.target.value)}
        />
    </FormControl>

    <FormControl w={'50%'} isRequired>
        <FormLabel>Password:</FormLabel>
        <Input type='password' placeholder='Enter Your password'
        value={password}
        name='password' 
        onChange={(e) => setpassword(e.target.value)}
        />
    </FormControl>

     
     <Button colorScheme={'green'} w={'fit-content'}
     onClick={handleLogin}
     >
        Login
    </Button>
    </VStack>
  )
}

export default Login
