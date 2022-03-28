import { render, screen, cleanup } from '@testing-library/react';
import Home from '@/pages/index';

afterEach(() => {
  cleanup();
});

test('Home elements to render as expected', () => {
  // "render"
  render(<Home />);

  // "arrange"
  const appDiv = screen.getByRole('application');
  const flexParent = screen.queryByTestId('flex-parent');
  const noImages = screen.queryByTestId('no-images');
  const loadingIndicator = screen.getByLabelText('loading-indicator');

  // "assert"
  expect(appDiv).toBeInTheDocument();
  expect(loadingIndicator).toBeInTheDocument();
  // elements should not be rendered yet, because data is loading
  expect(flexParent).not.toBeInTheDocument();
  expect(noImages).not.toBeInTheDocument();
});
