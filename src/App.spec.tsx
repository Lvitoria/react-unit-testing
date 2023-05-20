import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
   const { getByText } = render(<App />);
    expect(getByText('Hello World')).toBeInTheDocument();
});


test('verify class', () => {
   const { getByText } = render(<App />);
    expect(getByText('Hello World')).toHaveClass('test');
    expect(getByText('Hello World')).not.toHaveClass('test2');
    expect(getByText('Hello World')).toHaveAttribute('class', 'test');
});