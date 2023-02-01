import {Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, Image} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import HandleDelete from './HandleDelete'
  
  const EmployeeTable = ({employeeDatas}) => {
    const navigate = useNavigate()
    return (
        <TableContainer >
        <Table variant={'simple'}>
            <Thead>
            <Tr>
                <Th>Avatar</Th>
                <Th>First name</Th>
                <Th>Employee ID</Th>
                <Th>Department</Th>
                <Th>City</Th>
                <Th></Th>
            </Tr>
            </Thead>
            <Tbody>
            {
                employeeDatas.map((data) => (
                    <Tr key={data.id} cursor='pointer' 
                    onClick={() => navigate(`/employee/${data.id}` , {replace:true}) }
                    _hover={{bg:'green.100'}}
                    >
                    <Td>
                        <Image alt={data.firstname} 
                        src={data.imageUrl} w={'50px'} h={'50px'} rounded={'full'} />
                    </Td>
                    <Td>
                        <Text>{data.firstname} {data.lastname}</Text>
                    </Td>
                    <Td>
                    <Text>{data.id}</Text>
                    </Td>
                    <Td>
                    <Text>{data.department}</Text>
                    </Td>
                    <Td>
                    <Text>{data.city}</Text>
                    </Td>
                    <Td>
                       <HandleDelete id={data.id} imageUrl={data.imageUrl} />
                    </Td>
                </Tr>
                ))
                }
           
            </Tbody>
        </Table>
    </TableContainer>
    )
  }
  
  export default EmployeeTable
  