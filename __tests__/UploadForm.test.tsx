import { render, screen, cleanup } from '@testing-library/react';
import { UploadForm } from '../components/UploadForm';

afterEach(() => {
  cleanup();
});

const loadImages = jest.fn();

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
