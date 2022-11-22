import { act } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import '@testing-library/jest-dom';

describe('Teste se a pagina possui informações sobre a pokedex', () => {
  test('Testa se possui os conteudos devidos', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);
    act(() => {
      history.push('/about');
    });
    const titleAbout = getByRole('heading', {
      name: /about pokédex/i,
    });
    const text01 = getByText(
      /this application simulates a pokédex, a digital encyclopedia containing all pokémon/i,
    );
    const text02 = getByText(
      /one can filter pokémon by type, and see more details for each one of them/i,
    );
    const img = getByRole('img', {
      name: /pokédex/i,
    });
    const imgSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(titleAbout).toBeInTheDocument();
    expect(text01).toBeInTheDocument();
    expect(text02).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(imgSrc);
  });
});
