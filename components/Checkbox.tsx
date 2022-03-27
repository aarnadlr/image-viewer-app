import React from 'react';
import styled from '@emotion/styled';

const Input = styled.input`
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 9;
  width: 1.25rem;
  height: 1.25rem;
`;

type Props = {
  isChecked: boolean;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Checkbox({ isChecked, handleCheckboxChange }: Props) {
  return <Input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />;
}
