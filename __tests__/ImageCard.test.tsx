import ImageCard from '@/components/ImageCard';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('ImageCard to render and behave as expected', () => {
  const resourceObject = {
    context: {
      title: 'test',
      description: 'test',
    },
    public_id: 'test',
  };
  const setCheckedImagesArr = jest.fn();
  const checkedImagesArr: Array<{ [x: string]: string }> = [];

  // "render"
  render(
    <ImageCard
      resourceObject={resourceObject}
      setCheckedImagesArr={setCheckedImagesArr}
      checkedImagesArr={checkedImagesArr}
    />
  );

  // "arrange"
  const title = screen.getByTestId('title');
  const description = screen.getByTestId('description');
  const downloadButton = screen.getByTestId('download-button');

  // "assert"
  expect(title).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(downloadButton).toBeInTheDocument();

  expect(title).toBeVisible();
  expect(description).toBeVisible();
  expect(downloadButton).toBeVisible();

  expect(downloadButton).toBeEnabled();
});
