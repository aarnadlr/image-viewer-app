import React from 'react';
import { Flex, Spacer, Box, Heading } from '@chakra-ui/react';
import { UploadModal } from '../components/UploadModal';

type Props = {
  loadImages: () => void;
  resourceObjectsArr: []|null;
};

export function Header({loadImages, resourceObjectsArr
}: Props) {

  return (
    <nav style={{marginBottom: '40px'}}>
      <Flex>
        <Box>
          <Heading size="lg" color={'purple.500'} marginBottom={'.5rem'}>
            Image Viewer App
          </Heading>

          <Heading size="sm" color={'purple.500'} fontWeight={500}>
            Select images to download
          </Heading>

        </Box>
        <Spacer />

        <Box display="flex" alignItems="center">

        <UploadModal resourceObjectsArr={resourceObjectsArr} loadImages={loadImages} />

        </Box>
      </Flex>
    </nav>
  );
}
