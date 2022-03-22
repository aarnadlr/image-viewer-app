import React from 'react';
import { Flex, Spacer, Box, Button, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { UploadModal } from '../components/UploadModal';

type Props = {};

export function Header({}: Props) {
  const router = useRouter();

  return (
    <nav style={{marginBottom: '40px'}}>
      {console.log('router:', router)}
      <Flex>
        <Box>
          <Heading size="lg" color={'purple.500'}>
            Image Viewer App
          </Heading>
        </Box>
        <Spacer />

        <Box display="flex" alignItems="center">

        <UploadModal />

        </Box>
      </Flex>
    </nav>
  );
}
