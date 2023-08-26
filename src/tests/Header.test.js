import React from 'react';
import { render } from '@testing-library/react-native';
import Header from '../components/Header';

describe('Header Component', () => {
  it('should render the header title correctly', () => {
    const headerTitle = 'Test Header';
    const { getByText } = render(<Header headerTitle={headerTitle} />);

    const titleElement = getByText(headerTitle);
    expect(titleElement).toBeDefined();
  });
});