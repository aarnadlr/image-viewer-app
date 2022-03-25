import React from 'react';
import { Flex, Spacer, Box, Heading, Button } from '@chakra-ui/react';
import { UploadModal } from '../components/UploadModal';
import { DownloadIcon } from '@chakra-ui/icons';
import { zipFiles } from '../utils/zipFiles';

type Props = {
  loadImages: () => void;
  resourceObjectsArr: [] | null;
  checkedImagesArr: {}[];
};

export function Header({
  loadImages,
  resourceObjectsArr,
  checkedImagesArr,
}: Props) {
  const handleZipFiles = () => {
    zipFiles(checkedImagesArr);
  };

  return (
    <nav style={{ marginBottom: '40px' }}>
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
          <Button
            data-testid="download-button"
            leftIcon={<DownloadIcon />}
            onClick={handleZipFiles}
            size="lg"
            colorScheme="gray"
            margin="1rem 1rem 1rem 0"
            disabled={checkedImagesArr.length > 0 ? false : true}
          >
            Download Selected Files
          </Button>

          <UploadModal
            resourceObjectsArr={resourceObjectsArr}
            loadImages={loadImages}
          />
        </Box>
      </Flex>
    </nav>
  );
}
