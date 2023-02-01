import { Box, Grid, GridItem, Heading, Progress, Stack, Text, Button, Link} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { db } from '../config/FireBaseConfig'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore' 
import EmployeeTable from '../components/EmployeeTable'
import {NavLink} from 'react-router-dom'
import { auth } from '../config/FireBaseConfig'
import {useAuthState } from  'react-firebase-hooks/auth' 
import SignOut from '../Auth,jsx/SignOut'





const Home = () => {
    // state for holding employee data
    const [employeeDatas, setemployeeDatas] = useState(null);
    const [user] = useAuthState(auth)

    useEffect(() => {
        const dataRef = collection(db, 'admin');
        const q = query(dataRef, orderBy('createdAt', 'desc'));
        onSnapshot(q, (snapshot) => {
            const employeeDatas = snapshot.docs.map((doc) => 
            ({id: doc.id, ...doc.data()}))
            setemployeeDatas(employeeDatas)
            // console.log(employeeDatas)
        })
    },[])

  return (
    <section>
        <Grid templateColumns='repeat(6, 1fr)'>
            <GridItem colSpan={1} bg='blackAlpha.100' p='1rem'>
                <Stack>
                <NavLink to={'/'}>
                <Heading size={'md'} color={'blue.400'} >Dashboard</Heading>
                </NavLink>

                <NavLink to={'/form'}>
                    <Heading size={'md'} color={'black'}>Add Employee</Heading>
                </NavLink>

                <NavLink to={'/login'}>
                    {
                    !user? <Heading size={'md'}>Login</Heading> : <SignOut />

                    }  
                    </NavLink> 
                </Stack>
            </GridItem>
            <GridItem colSpan={5}>
            <Box  my={'2rem'}>
            {
                !employeeDatas ? 
                (<>
                    <Text color='red' textAlign={'center'}>Data Loading</Text>
                    <Progress hasStripe value={100} />
                </>) 
                : 
                (
                    <EmployeeTable employeeDatas={employeeDatas} />             
                )
            }
           
        </Box>
            </GridItem>
        </Grid>
        
    </section>
  )
}

export default Home
