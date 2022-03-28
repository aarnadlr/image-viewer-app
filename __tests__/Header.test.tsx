import { render, screen, cleanup } from '@testing-library/react';
import { Header } from '../components/Header';

afterEach(() => {
  cleanup();
});

const loadImages = jest.fn();
const resourceObjectsArr: [] = [];
const checkedImagesArr: [] = [];

test('Header to render as expected', () => {
  // "render"
  render(
    <Header
      resourceObjectsArr={resourceObjectsArr}
      loadImages={loadImages}
      checkedImagesArr={checkedImagesArr}
    />
  );

  // "arrange"
  const heading = screen.getByTestId('heading');
  const subheading = screen.getByTestId('subheading');
  const downloadButton = screen.getByTestId('download-button');
  const uploadButton = screen.getByRole('button', { name: /upload/i });
  const iconButton = screen.getByTestId('icon-button');

  // "assert"
  expect(heading).toBeInTheDocument();
  expect(subheading).toBeInTheDocument();
  expect(uploadButton).toBeInTheDocument();
  expect(downloadButton).toBeInTheDocument();
  expect(downloadButton).toBeDisabled();
  expect(iconButton).toBeInTheDocument();
});
