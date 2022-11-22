import { act } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import '@testing-library/jest-dom';

describe('Pagina de Pokémon Favoritos:', () => {
  test('Se a pagina possui a mensagem de não haver pokemon favorito', () => {
    const { getByText, history } = renderWithRouter(<App />);

    act(() => {
      history.push('/favorites');
    });

    const noFavPokemon = getByText(/no favorite pokémon found/i);

    expect(noFavPokemon).toBeInTheDocument();
  });
});
