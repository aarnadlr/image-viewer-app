import React from 'react';
import { Flex, Spacer, Box, Button, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';

type Props = {};

export function Header({}: Props) {
  const router = useRouter();

  return (
    <nav style={{marginBottom: '40px'}}>
      {console.log('router:', router)}
      <Flex>
        <Box p="2">
          <Heading size="lg" color={'purple.500'}>
            Image Viewer App
          </Heading>
        </Box>
        <Spacer />

        <Box display="flex" alignItems="center">
          {router.pathname === '/' ? (
            <Button
              onClick={() => router.push('/upload')}
              size="lg"
              colorScheme={'purple'}
            >
              Upload
            </Button>
          ) : (
            <Button
              onClick={() => router.push('/')}
              size="lg"
              colorScheme={'purple'}
            >
              Back to Home
            </Button>
          )}
        </Box>
      </Flex>
    </nav>
  );
}
