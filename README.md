# React com teste com jest

utilizaremos os teste unitarios com o jest

## Instalando as dependências 📝  
~~~~shell 
 npm i jest -d 
~~~~

~~~shell  
  npm i ts-node -D
~~~

~~~~shell 
 npm i @swc/core @swc/jest -D
~~~~
O swc converte o codigo de um formato para  outro formato, depois não esqueça  de copiar o `transform` dentro do jest.config deste projeto

~~~~shell 
 npm install -D jest-environment-jsdom
~~~~

~~~~shell 
 npm i @testing-library/react @testing-library/jest-dom @testing-library/user-event -D
~~~~

## Configurando o jest 🚀 


~~~javascript  
  npx jest --init
~~~

#### opções  do jest 
- Would you like to use Jest when running "test" script in "package.json"? **y** 
- Would you like to use Typescript for the configuration file?  **y**
- Choose the test environment that will be used for testing ? **jsdom (browser-like)** 
- Do you want Jest to add coverage reports? **y**
- Which provider should be used to instrument code for coverage?  **v8**
- Automatically clear mock calls, instances, contexts and results before every test? **y**

## Configurando o jest com Dom

Por padrão o jest não foi feito para utilizar com a dom, portanto temos que fazer uma configuração a mais utilizando o pacote `@testing-library/jest-dom`, siga o passo a pass: 
- Crie um arquivo e importe o pacote
- No arquivo `jest.config` modificar o `setupFilesAfterEnv`, para carregar o arquivo que você criou na linha anterior,exemplo: `'<rootDir>/src/test/setup.ts'`. 

Com isso ele vai carregar este arquivo junto com os testes, agora graças a este pacote temos outras abordagens para usar, não apenas o toBe mas podemos usar como exemplo `toBeInTheDocument`
<blockquote> as vezes é necessario um reload no vscode </blockquote>


    
## sobre o codigo  dos teste  ✨  

o pacote  `@testing-library/react` é oque me permite pegar um componente ficando assim 

~~~~javascript
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
   const { getByText } = render(<App />);
    expect(getByText('Hello World')).toBeTruthy();
});
~~~~

o render nos disponibiliza algumas coisas a mais além do `getByText`, mas devemos nos atentar no inicio da nomenclatura são elas: 
- getAll = pega todos os elements
- get    = pega só um, quebra se o elemento não tiver em tela Obs: se tiver um elemento duplicado na tela ele falha
- find   = pega só um, mas espera o elemento aparecer em tela  
- query  = que se caso não aparecer o elemento ele não quebra o test

<hr/>

o  `waitFor` é uma das opções para esperar resposta assincronas, mas ele faz um loop até a resposta chegar, ou podemos simplesmente usar o `findByText` com `async` e `await`
~~~~javascript
await waitFor(() => {
            expect(getByText('teste')).toBeInTheDocument();
        })
~~~~

~~~~javascript
it('should be able to add new item to list by input', async () => {
        const { getByText, getByPlaceholderText, findByText, debug } = render(<List InitialItems={[]} />);
        debug();
        const input = getByPlaceholderText('novo item') as HTMLInputElement;
        const button = getByText('Add pelo input'); // pegar o button
        fireEvent.change(input, { target: { value: 'teste' } });
        fireEvent.click(button); // clicar no button
        debug();
        expect( await findByText('teste')).toBeInTheDocument();
});
~~~~

<hr/>

Para chamar o mesmo componete de novo usamos o `rerender`

~~~~javascript
it('should render list item', () => {
        const { getByText, rerender, queryByText, unmount } = render(<List  InitialItems={['a', 'b', 'c']} />);
        expect(getByText('a')).toBeInTheDocument();
        expect(getByText('b')).toBeInTheDocument();
        expect(getByText('c')).toBeInTheDocument();
        unmount()
        rerender(<List  InitialItems={['i']} />);
        expect(getByText('i')).toBeInTheDocument();
        expect(queryByText('a')).not.toBeInTheDocument();
});
~~~~

<hr/>

## debugar 
 dentro do `render` existe uma função `debug()` que podemos ver o antes e depois do html 
 exemplo :
~~~~javascript
import { render, fireEvent } from '@testing-library/react';
import App from './App';

it('should be able to add new item to list', () => {
    const { getByText, debug } = render(<App />);
    debug();
    const button = getByText('Add'); // pegar o button
    fireEvent.click(button); // clicar no button
    debug();
    expect(getByText('d')).toBeInTheDocument();
});
~~~~


[Git do base deste documentação](https://github.com/diego3g/react-unit-testing)