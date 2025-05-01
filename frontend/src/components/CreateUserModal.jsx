import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Textarea, useDisclosure } from '@chakra-ui/react';
import { BiAddToQueue } from "react-icons/bi"
import React from 'react'

const CreateUserModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button onClick={onOpen}>
                <BiAddToQueue size={20} />
            </Button>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>My New Contact</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Flex alignItems={"center"} gap={4}>
                            {/*Left */}
                            <FormControl>
                                <FormLabel>Full Name</FormLabel>
                                <Input placeholder="Kari"></Input>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Role</FormLabel>
                                <Input placeholder="Developer"></Input>
                            </FormControl>

                        </Flex>
                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Textarea 
                                resize={"none"} 
                                overflowY={"hidden"}
                                placeholder='She is a great software developer'
                            />
                        </FormControl>
                        <RadioGroup defaultValue='female' mt={5}>
                            <Flex gap={5}>
                                <Radio value='male'>Male</Radio>
                                <Radio value='female'>Female</Radio>
                            </Flex>
                        </RadioGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Add
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>

            </Modal>
        </>


    )
}

export default CreateUserModal