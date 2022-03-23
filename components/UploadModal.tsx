import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  // ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  // FormControl,
  // FormLabel,
  // Input,
  useDisclosure,
} from '@chakra-ui/react';
import { UploadForm } from './UploadForm';

type Props = {
  loadImages: () => void;
  resourceObjectsArr: []|null;
};

export function UploadModal({ loadImages, resourceObjectsArr }: Props) {

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} size="lg" colorScheme={'purple'}>
        Upload
      </Button>

      <Modal
        // initialFocusRef={initialRef}
        // finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay backdropBlur="6px" />

        <ModalContent>

          <ModalHeader color={'purple.500'}>Upload an Image</ModalHeader>

          <ModalCloseButton />

          <ModalBody pb={6}>
            
          {/* <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input ref={initialRef} placeholder="First name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder="Last name" />
            </FormControl>
          </ModalBody> */}

          
            <UploadForm loadImages={loadImages} onClose={onClose} resourceObjectsArr={ resourceObjectsArr}/>
</ModalBody>



          {/* <ModalFooter> */}
            {/* <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button> */}
          {/* </ModalFooter> */}

        </ModalContent>
      </Modal>
    </>
  );
}
