import { Button } from '@chakra-ui/react'
import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../config/FireBaseConfig'

const SignOut = () => {
    const handleSignout = async() => {
        try {
            await signOut(auth)
            toast({
                title: 'signOut ',
                description: "succesfully signout",
                status: 'error',
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
    <Button 
    onClick={handleSignout}
    colorScheme={'red'}>
        SignOut
    </Button>
  )
}

export default SignOut
