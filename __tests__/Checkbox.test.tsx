import { Checkbox } from '@/components/Checkbox';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('Checkbox to render and behave as expected', () => {
  const handleCheckboxChange = jest.fn();
  const isChecked = false;

  // "render"
  render(
    <Checkbox
      isChecked={isChecked}
      handleCheckboxChange={handleCheckboxChange}
    />
  );

  // "arrange"
  const checkbox = screen.getByRole('checkbox');

  expect(checkbox).toBeInTheDocument();

  // "act"
  fireEvent.click(checkbox);
  fireEvent.click(checkbox);

  // "assert"
  expect(handleCheckboxChange).toHaveBeenCalled();
  expect(handleCheckboxChange).toHaveBeenCalledTimes(2);

  expect(checkbox).not.toBeChecked();
});
