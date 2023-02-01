import { Box, FormControl, Input, VStack, FormLabel, Button, } from '@chakra-ui/react'
import { async } from '@firebase/util';
import React, { useState } from 'react'

const Register = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('');
    const [confrimpsw, setconfirmpsw] = useState('')
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
 
     <FormControl w={'50%'} isRequired>
         <FormLabel>Password:</FormLabel>
         <Input type='password' placeholder='Confirm Your password' 
         name='confirm_password' 
         value={confrimpsw}
         onChange={(e) => setconfrimpsw(e.target.value)}
         />
     </FormControl>
      
      <Button colorScheme={'green'} w={'50%'}
      onClick={handleLogin}
      >
         Login
     </Button>
     </VStack>
  )
}

export default Register
