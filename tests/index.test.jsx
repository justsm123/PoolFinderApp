import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import App from '../src/App';
import ReportLostItem from '../src/ReportLostItem';

test('renders the main page', () => {
  const testMessage = 'Rsbuild with React';
  render(<App />);
  render(<ReportLostItem />);
  expect(screen.getByText(testMessage)).toBeInTheDocument();
});
