import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';

test('renders App', () => {
  act(() => {
    render(<App />);
  });
});
