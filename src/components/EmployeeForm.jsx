import { Box, FormControl, FormLabel, Input,  Flex, Button, useToast, Progress } from '@chakra-ui/react'
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { getDownloadURL, ref,  uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../config/FireBaseConfig';




const EmployeeForm = () => {
 const initial = {
        first: '',
        last: '',
        city: '',
        salary: 0,
        dob: '',
        email: '',
        phone: '',
        address: '',
        image: '',
        department: '',
        designation: '',
        worktype: '',
    }
    
    const [formData, setformData] = useState(initial);
    const [progress, setprogress] = useState(0);
    const toast = useToast()
    const navigate = useNavigate()
        // console.log(formData)

    const handleFormChange = (e) => {
        const {name, value} = e.target;
        setformData({ ...formData, [name]: value})
    };

    const handleImageChange = (e) => {
        setformData({...formData, image: e.target.files[0]})
    };

    const handleSubmit = (e) => {
        const storageRef = ref(storage, `/images/${Date.now()}${formData.image}${formData.title}`)
       const uploadImage = uploadBytesResumable(storageRef, formData.image);
       
        uploadImage.on('state_changed' ,
        (snapshot) => {
            const progresPercent = 
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);
            setprogress(progresPercent);
        },
        (err) => {
            console.log(err)
            toast({
                title: 'Error.',
                description: "We've created your Post error.",
                status: 'error',
                duration: 4000,
                isClosable: true,
              })
        },
        () => {
            setformData(initial)
            getDownloadURL(uploadImage.snapshot.ref).then((url) => {
                const dataRef = collection(db, 'admin');
                addDoc(dataRef, {
                    firstname: formData.first,
                    lastname: formData.last,
                    city: formData.city,
                    salary: formData.salary,
                    dob: formData.dob,
                    email: formData.email,
                    phonenum: formData.phone,
                    address: formData.address,
                    department: formData.department,
                    designation: formData.designation,
                    worktype: formData.worktype,
                    imageUrl: url,
                    createdAt: Timestamp.now().toDate()
                })
                .then(() => {
                    toast({
                        title: 'Post created.',
                        description: "We've created your Post for you.",
                        status: 'success',
                        duration: 4000,
                        isClosable: true,
                      })
                    setprogress(0)
                    navigate('/')
                })
                .catch((err) => {
                    toast({
                        title: 'Error.',
                        description: "We've created your Post error.",
                        status: 'error',
                        duration: 4000,
                        isClosable: true,
                      })
                })
            })
            
        }
        )
        e.preventDefault()
        setformData(initial)
    }

  return (
   <Box>
      <form onSubmit={handleSubmit}>
        <Flex wrap={'wrap'} p={5} gap={4}>
            <FormControl isRequired w={['45%', '45%','30%', '30%']}>
                <FormLabel>First Name:</FormLabel>
                <Input type={'text'} name='first' placeholder='first name' 
                onChange={handleFormChange}
                value={formData.first} />
            </FormControl>

            <FormControl isRequired w={['45%', '45%','30%', '30%']}>
                <FormLabel>Last Name:</FormLabel>
                <Input type={'text'} name='last' placeholder='last name' 
                onChange={handleFormChange}
                value={formData.last} />
            </FormControl>

            <FormControl isRequired w={['45%', '45%','30%', '30%']}>
                <FormLabel>City:</FormLabel>
                <Input type={'text'} name='city' placeholder='city' 
                onChange={handleFormChange}
                value={formData.city} />
            </FormControl>

            <FormControl isRequired w={['45%', '45%','30%', '30%']}>
                <FormLabel>Email:</FormLabel>
                <Input type={'email'} name='email' placeholder='email' 
                onChange={handleFormChange}
                value={formData.email} />
            </FormControl>

            <FormControl isRequired w={['45%', '45%','30%', '30%']}>
                <FormLabel>phone number:</FormLabel>
                <Input type={'tel'} name='phone' placeholder='Phone number' 
                onChange={handleFormChange}
                value={formData.phone} />
            </FormControl>

            <FormControl isRequired w={['45%', '45%','30%', '30%']}>
                <FormLabel>Address:</FormLabel>
                <Input type={'text'} name='address' placeholder='Your address' 
                onChange={handleFormChange}
                value={formData.address} />
            </FormControl>

            <FormControl isRequired w={['45%', '45%','30%', '30%']}>
                <FormLabel>City:</FormLabel>
                <Input type={'text'} name='city' placeholder='Current city' 
                onChange={handleFormChange}
                value={formData.city} />
            </FormControl>

            <FormControl isRequired w={['45%', '45%','30%', '30%']}>
                <FormLabel>Date of birth:</FormLabel>
                <Input type={'date'} name='dob' placeholder='date of birth' 
                onChange={handleFormChange}
                value={formData.dob} />
            </FormControl>

            <FormControl isRequired w={['45%', '45%','30%', '30%']}>
                <FormLabel>Department:</FormLabel>
                <Input type={'text'} name='department' placeholder='Departmant' 
                onChange={handleFormChange}
                value={formData.department} />
            </FormControl>

            <FormControl isRequired w={['45%', '45%','30%', '30%']}>
                <FormLabel>Salary/Month:</FormLabel>
                <Input type={'number'} name='salary' placeholder='salary/month' 
                onChange={handleFormChange}
                value={formData.salary} />
            </FormControl>

            <FormControl isRequired w={['45%', '45%','30%', '30%']}>
                <FormLabel>Designation:</FormLabel>
                <Input type={'text'} name='designation' placeholder='Designation' 
                onChange={handleFormChange}
                value={formData.designation} />
            </FormControl>

            <FormControl isRequired w={['45%', '45%','30%', '30%']}>
                <FormLabel>Worktype:</FormLabel>
                <Input type={'text'} name='worktype' placeholder='Worktype' 
                onChange={handleFormChange}
                value={formData.worktype} />
            </FormControl>
            
            <FormControl isRequired w={['45%', '45%','30%', '30%']}>
                <FormLabel>Upload  photo:</FormLabel>
                <Input type={'file'} accept={'image/*'} name='image' 
                onChange={e => handleImageChange(e)}
                 />
            </FormControl>
        </Flex>
        <Progress hasStripe value={progress} />
        <Flex justify={'center'}>
        <Button colorScheme={'green'} w={'50%'} 
        disabled={progress < 0}
        type={'submit'}>
            Add Employee
        </Button>
        </Flex>
    </form>
   </Box>
  )
}

export default EmployeeForm

