import React from 'react';
import {
  Flex,
  Box,
  Heading,
  Button,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  IconButton,
} from '@chakra-ui/react';
import { UploadModal } from '../components/UploadModal';
import { DownloadIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';
import { zipFiles } from '../utils/zipFiles';
import styled from '@emotion/styled';

type Props = {
  loadImages: () => void;
  resourceObjectsArr: [] | null;
  checkedImagesArr: {}[];
};

const Nav = styled(Flex)`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 40px;
`;

export function Header({
  loadImages,
  resourceObjectsArr,
  checkedImagesArr,
}: Props) {
  const handleZipFiles = () => {
    zipFiles(checkedImagesArr);
  };

  const buttonSize = useBreakpointValue({ base: 'sm', md: 'lg' });
  const { colorMode, toggleColorMode } = useColorMode();
  const color = useColorModeValue('purple.500', 'purple.200');

  return (
    <Nav flexDirection={{ base: 'column', md: 'row' }}>
      <Box>
        <Heading
          fontSize={'2rem'}
          height={'40px'}
          lineHeight={1.2}
          color={color}
          marginBottom={'.5rem'}
        >
          Image Viewer App
        </Heading>

        <Heading
          fontSize={'1rem'}
          height={'20px'}
          lineHeight={1.2}
          color={color}
          fontWeight={500}
        >
          Select images to download
        </Heading>
      </Box>

      <Box display="flex" alignItems="center">
        <Button
          data-testid="download-button"
          leftIcon={<DownloadIcon />}
          onClick={handleZipFiles}
          size={buttonSize}
          colorScheme="gray"
          margin="1rem .5rem 1rem 0"
          disabled={checkedImagesArr.length > 0 ? false : true}
        >
          Download Selected Files
        </Button>

        <UploadModal
          resourceObjectsArr={resourceObjectsArr}
          loadImages={loadImages}
        />

        <IconButton
          margin="0 0 0 .5rem"
          size={buttonSize}
          onClick={toggleColorMode}
          aria-label="color mode"
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        />
      </Box>
    </Nav>
  );
}
