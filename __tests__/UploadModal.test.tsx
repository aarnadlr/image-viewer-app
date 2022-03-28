import { render, screen, cleanup } from '@testing-library/react';
import { UploadModal } from '../components/UploadModal';

afterEach(() => {
  cleanup();
});

const loadImages = jest.fn();
const resourceObjectsArr:[] = [];

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