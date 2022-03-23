import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Home from '@/pages/index';
import { UploadModal } from '../components/UploadModal';
import { UploadForm } from '../components/UploadForm';

//test Home page components
describe('Home', () => {
  // "render"
  render(<Home />);

  afterEach(() => {
    cleanup();
  });

  // "arrange"
  const heading = screen.getByText('Image Viewer App');
  const uploadButton = screen.getByRole('button', { name: /upload/i });
  const loadImages = jest.fn();
  const resourceObjectsArr: any = [];

  // "assert"
  test('initial UI is rendered as expected', () => {
    expect(heading).toBeInTheDocument();
    expect(uploadButton).toBeInTheDocument();
  });

  test('UploadModal to render as expected', () => {
    render(
      <UploadModal
        loadImages={loadImages}
        resourceObjectsArr={resourceObjectsArr}
      />
    );

    const button = screen.getByRole('button', {
      name: /upload/i,
    });

    expect(button).toBeInTheDocument();

  });

  test('UploadForm to render as expected', () => {
    
    render(<UploadForm loadImages={loadImages} />);

    // "arrange"
    const descriptionLabel = screen.getByTestId('description-label');
    const titleInput = screen.getByPlaceholderText('Add a title here');
    const descInput = screen.getByPlaceholderText('Add a description here');

    expect(descriptionLabel).toBeInTheDocument();
    expect(titleInput).toBeInTheDocument();
    expect(descInput).toBeInTheDocument();

  });

});
