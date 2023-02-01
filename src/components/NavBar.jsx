import { Button, Heading, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import {NavLink} from 'react-router-dom'
import { auth } from '../config/FireBaseConfig'
import {useAuthState } from  'react-firebase-hooks/auth' 
import SignOut from '../Auth,jsx/SignOut'

const NavBar = () => {
  const [user] = useAuthState(auth)
//   console.log(user)

  return (
   <HStack w={'100vw'} wrap={'wrap'} bg={'blackAlpha.700'} p={2} 
   spacing={'2rem'} justify='center' px={'1.5rem'}>
     <NavLink to={'/'}>
        <Heading size={'md'} color={'blue.400'} >Admin</Heading>
     </NavLink>
     <Text color={'blue.100'}>
     signedin as: {user.displayName || user.email}
     </Text>
     {/* <NavLink to={'/form'}>
        <Text color={'white'}>Add Employee</Text>
     </NavLink>

     <NavLink to={'/login'}>
      {
      !user? <Button>Login</Button> : <SignOut />

      }  
       </NavLink>  */}
   </HStack>
  )
}

export default NavBar
