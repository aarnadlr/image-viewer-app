import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Home from '@/pages/index';
import { UploadModal } from '../components/UploadModal';
import { UploadForm } from '../components/UploadForm';

afterEach(() => {
  cleanup();
});

const loadImages = jest.fn();
const resourceObjectsArr: [] = [];


test('homepage UI to render as expected', () => {
  // "render"
  render(<Home />);

  // "arrange"
  const heading = screen.getByText('Image Viewer App');
  const uploadButton = screen.getByRole('button', { name: /upload/i });

  // "assert"
  expect(heading).toBeInTheDocument();
  expect(uploadButton).toBeInTheDocument();
});


test('UploadModal to render as expected', () => {
  // "render"
  render(
    <UploadModal
      loadImages={loadImages}
      resourceObjectsArr={resourceObjectsArr}
    />
  );

  // "arrange"
  const button = screen.getByRole('button', {
    name: /upload/i,
  });

  // "assert"
  expect(button).toBeInTheDocument();
});


test('UploadForm to render as expected', () => {
  // "render"
  render(<UploadForm loadImages={loadImages} />);

  // "arrange"
  const titleLabel = screen.getByTestId('title-label');
  const descriptionLabel = screen.getByTestId('description-label');
  const titleInput = screen.getByPlaceholderText('Add a title here');
  const descInput = screen.getByPlaceholderText('Add a description here');

  // "assert"
  expect(titleLabel).toBeInTheDocument();
  expect(descriptionLabel).toBeInTheDocument();
  expect(titleInput).toBeInTheDocument();
  expect(descInput).toBeInTheDocument();
});
