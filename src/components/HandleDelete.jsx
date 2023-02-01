import { Button, IconButton, useToast } from '@chakra-ui/react'
import { db, storage } from '../config/FireBaseConfig'
import { deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { MdDeleteForever } from "react-icons/md";

const HandleDelete = ({id, imageUrl}) => {
  const toast = useToast();

  const onDelete = async() => {
    if (window.confirm('Once deleted data cannot be recovered!! are you sure?')){
      try {
        //delete data
        await deleteDoc(doc(db, 'admin', id))
        toast({
            title: 'data deleted successfully',
            description: "We've deleted your data",
            status: 'success',
            duration: 4000,
            isClosable: true,
          })
        // deleting image
        const storageRef = ref(storage, imageUrl)
        await deleteObject(storageRef)
      } catch (error) {
        toast({
            title: 'Error',
            description: "an error occured",
            status: 'error',
            duration: 4000,
            isClosable: true,
          })
      }
    }
  }

 return (
  <>
  <MdDeleteForever cursor={'pointer'} onClick={onDelete} color={'red'}  />
  </>
  )
}

export default HandleDelete




