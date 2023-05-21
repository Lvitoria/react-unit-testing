import { render, fireEvent, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import List from './List';

describe('List Component', () => {
    it('should text if name is "Hello World"', () => {
       const { getByText } = render(<List InitialItems={['a', 'b', 'c']} />);
        expect(getByText('Hello World')).toBeInTheDocument();
    });
    
    
    it('should which class', () => {
       const { getByText } = render(<List InitialItems={['a', 'b', 'c']} />);
        expect(getByText('Hello World')).toHaveClass('test');
        expect(getByText('Hello World')).not.toHaveClass('test2');
        expect(getByText('Hello World')).toHaveAttribute('class', 'test');
    });

    it('should render list item', () => {
        const { getByText } = render(<List  InitialItems={['a', 'b', 'c']} />);
        expect(getByText('a')).toBeInTheDocument();
        expect(getByText('b')).toBeInTheDocument();
        expect(getByText('c')).toBeInTheDocument();
    });

    it('should be able to add new item to list', () => {
        const { getByText, debug } = render(<List InitialItems={[]} />);
        debug();
        const button = getByText('Add'); // pegar o button
        fireEvent.click(button); // clicar no button
        debug();
        expect(getByText('d')).toBeInTheDocument();
    });

    it('should be able to add new item to list by input', async () => {
        const { getByText, getByPlaceholderText, findByText, debug } = render(<List InitialItems={[]} />);
        console.log("5");
        debug();
        const input = getByPlaceholderText('novo item') as HTMLInputElement;
        const button = getByText('Add pelo input'); // pegar o button
        fireEvent.change(input, { target: { value: 'teste' } });
        fireEvent.click(button); // clicar no button
        console.log("5");
        debug();
        expect( await findByText('teste')).toBeInTheDocument();
        await waitFor(() => {
            expect(getByText('teste')).toBeInTheDocument();
        })
    });

    it('should be able to remove item from list', async () => {
        const { getByText, getAllByText, queryByText } = render(<List InitialItems={['a', 'b', 'c']}/>);
        const buttons = getAllByText('Remover'); // pegar o button
        fireEvent.click(buttons[0]); // clicar no button
        await waitForElementToBeRemoved(() =>  getByText('a'));
        await waitFor(() => {
            expect(queryByText('a')).not.toBeInTheDocument();
        })
    });
});