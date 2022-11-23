import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemonList from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Testa a pagina `Pokemeon Details`', () => {
  const link = '/pokemon/25';
  test('Testa se as informações são exibidas corretamente', () => {
    const { history, getByRole, getByText } = renderWithRouter(<App />);
    const moreDetails = getByRole('link', { name: /more details/i });

    act(() => {
      history.push(link);
    });

    const pokeDetails = getByRole('heading', {
      name: /pikachu details/i,
    });
    const summary = getByRole('heading', { name: /summary/i });
    const paragraph = getByText(/this intelligent pokémon/i);

    expect(moreDetails).not.toBeInTheDocument();
    expect(pokeDetails).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  });

  test('Testa se existe uma seção contendo os mapas', () => {
    const { getByRole, getAllByRole, getByText, history } = renderWithRouter(<App />);
    const locations = pokemonList[0].foundAt;

    act(() => {
      history.push(link);
    });

    const titleMaps = getByRole('heading', {
      name: /game locations of pikachu/i,
    });
    const mapsImgs = getAllByRole('img', {
      name: /location/i,
    });

    locations.forEach((location, index) => {
      const locationName = getByText(location.location);
      expect(mapsImgs[index].src).toBe(location.map);
      expect(mapsImgs[index].alt).toBe('Pikachu location');
      expect(locationName).toBeInTheDocument();
    });
    expect(mapsImgs.length).toBe(locations.length);
    expect(titleMaps).toBeInTheDocument();
  });

  test('A função de favoritar', () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);

    act(() => {
      history.push(link);
    });

    const favText = getByText(/pokémon favoritado\?/i);
    const favBox = getByRole('checkbox', { name: /pokémon favoritado\?/i });

    userEvent.click(favBox);
    const favImg = getByRole('img', { name: /pikachu is marked as favorite/i });

    expect(favImg).toBeInTheDocument();
    expect(favText).toBeInTheDocument();
    expect(favBox).toBeInTheDocument();
  });
});
