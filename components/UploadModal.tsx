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
  resourceObjectsArr: [] | null;
};

export function UploadModal({ loadImages, resourceObjectsArr }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} size="lg" colorScheme={'purple'}>
        Upload
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay backdropBlur="6px" />

        <ModalContent>
          <ModalHeader color={'purple.500'}>Upload an Image</ModalHeader>

          <ModalCloseButton data-testid="ModalCloseButton" />

          <ModalBody pb={6}>
            <UploadForm
              loadImages={loadImages}
              onClose={onClose}
              resourceObjectsArr={resourceObjectsArr}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
