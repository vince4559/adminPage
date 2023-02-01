import { Box, Flex, Grid, GridItem, HStack, Image, Stack, Table, TableContainer, Tbody, Td, Text, Tr, VStack } from '@chakra-ui/react'
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../config/FireBaseConfig';
import { AiFillEdit } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { FaBirthdayCake, FaTelegramPlane } from "react-icons/fa";


const EmployeeDetails = () => {
  const {id} = useParams();
  const [singleData, setsingleData] = useState(null);
  // console.log(singleData)

  useEffect(() => {
   const docRef = doc(db, 'admin', id);
   onSnapshot(docRef, (snapshot) => {
    setsingleData({...snapshot.data(), id: snapshot.id})
   })
  },[id])

  return (
   <Box m={4}>
    {
      singleData && (
        <Stack w={'90vw'} p={4} m={2} bg={'gray.100'}>
          <Grid templateColumns='repeat(3, 1fr)' gap={4}>
            <GridItem colSpan={[3,3,1,1]} >
             <VStack>
             <Image alt={singleData.firstname} src={singleData.imageUrl} w={'200px'} h={'230px'} />            
            <Text fontWeight={'bold'} textTransform={'uppercase'}>
              {singleData.firstname} {singleData.lastname}
              </Text>
            <Text textTransform={'uppercase'} color={'green'}>
              {singleData.designation}
              </Text>
            <Text bg={'blue.500'} p={2} color='white'>
              At work for: 1year 3months 7days 
              </Text>
              <hr />
              <hr />

             <HStack p={3} gap={3} bg={'blue.600'} color='white'>
                <VStack>
                  <Text>0/28</Text>
                  <Text>ATTENDANCE</Text>
                </VStack>

                <VStack>
                  <Text>0/440</Text>
                  <Text>LEAVE</Text>
                </VStack>

                <VStack>
                  <Text>1</Text>
                  <Text>Award</Text>
                </VStack>
             </HStack>
            <Text color={'green'} fontFamily='bold'>
             Employed On: {singleData.createdAt.toDate().toDateString()}
            </Text>
             
             <Flex p={2} justify={'flex-start'} gap={3} alignItems='center' mt={'1rem'}>
                <FaBirthdayCake color='red' />
                <Text color={'red'} >Upcoming Birthdays!!!</Text>
                </Flex>
              </VStack>
            </GridItem>

            <GridItem colSpan={[3,3,1,1]} bg={'gray.500'} p={3}>
             <Stack bg={'white'} >
                <Flex color={'white'}  bg={'blue.600'} p={2} justify={'flex-start'} gap={3} alignItems='center'>
                <AiFillEdit />
                <Text > Personal Details</Text>
                </Flex>

                  <TableContainer>
                    <Table>
                      <Tbody>
                        <Tr>
                          <Td>Name:</Td>
                          <Td textTransform={'uppercase'}>{singleData.firstname} {singleData.lastname}</Td>
                        </Tr>
                        <Tr>
                          <Td>Date of Birth:</Td>
                          <Td>{singleData.dob}</Td>
                        </Tr>
                        <Tr>
                          <Td>Email:</Td>
                          <Td>{singleData.email}</Td>
                        </Tr>
                        <Tr>
                          <Td>Phone:</Td>
                          <Td>{singleData.phonenum}</Td>
                        </Tr>
                        <Tr>
                          <Td>Address:</Td>
                          <Td>{singleData.address}</Td>
                        </Tr>
                        <Tr>
                          <Td>City:</Td>
                          <Td>{singleData.city}</Td>
                        </Tr>
                        <Tr>
                          <Td>Work type:</Td>
                          <Td>{singleData.worktype}</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>

                  <Flex color={'white'}  bg={'blue.600'} p={2} justify={'flex-start'} gap={3} alignItems='center'>
                <BsFillBagCheckFill />
                <Text > Company Details</Text>
                </Flex>

                <TableContainer>
                    <Table variant={'striped'}>
                      <Tbody>
                        <Tr>
                          <Td>Employee ID:</Td>
                          <Td>{singleData.id}</Td>
                        </Tr>
                        <Tr>
                          <Td>Department:</Td>
                          <Td>{singleData.department}</Td>
                        </Tr>
                        <Tr>
                          <Td>Designation:</Td>
                          <Td>{singleData.designation}</Td>
                        </Tr>
                        <Tr>
                          <Td>Salary:</Td>
                          <Td>${singleData.salary}.00</Td>
                        </Tr>
                                               
                      </Tbody>
                    </Table>
                  </TableContainer>
             </Stack>
            </GridItem>

            <GridItem colSpan={[3,3,1,1]} bg={'gray.500'} p={3}>
              <Stack bg={'white'}>
              <Flex color={'white'}  bg={'blue.600'} p={2} justify={'flex-start'} gap={3} alignItems='center' mb={'3rem'}>
                <HiOutlineSpeakerphone />
                <Text >Notice Board</Text>
                </Flex>
                <Text p={'4rem'}>
                  No Notice
                </Text>
                <Flex color={'white'}  bg={'blue.600'} p={2} justify={'flex-start'} gap={3} alignItems='center'>
                <FaTelegramPlane />
                <Text >Upcoming Holidays</Text>
                </Flex>

                <TableContainer>
                    <Table variant={'striped'}>
                      <Tbody color={'red'}>
                        <Tr>
                          <Td>Office Off</Td>
                          <Td>Feb 14, 2023</Td>
                        </Tr>
                        <Tr>
                          <Td>Office Off</Td>
                          <Td>April 7, 2023</Td>
                        </Tr> 
                        <Tr>
                          <Td>Office Off</Td>
                          <Td>April 10, 2023</Td>
                        </Tr>           
                      </Tbody>
                    </Table>
                  </TableContainer>
              </Stack>
            </GridItem>
          </Grid>
        </Stack>
      )
    }
   </Box>
  )
}

export default EmployeeDetails
