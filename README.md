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