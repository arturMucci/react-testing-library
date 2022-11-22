import userEvent from '@testing-library/user-event';
import { act } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import '@testing-library/jest-dom';

describe('Se o topo da aplicação tem os links devidos', () => {
  test('O link Home', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    // Acessar
    const home = getByRole('link', {
      name: /home/i,
    });
    userEvent.click(home);
    // Agir
    // Aferir
    expect(home).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');
  });
  test('O link About', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const about = getByRole('link', {
      name: /about/i,
    });

    userEvent.click(about);

    expect(about).toBeInTheDocument();
    expect(history.location.pathname).toBe('/about');
  });
  test('O link `Favorite Pokémon`', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const favPokemon = getByRole('link', {
      name: /favorite pokémon/i,
    });

    userEvent.click(favPokemon);

    expect(favPokemon).toBeInTheDocument();
    expect(history.location.pathname).toBe('/favorites');
  });
  test('Se necessario redireciona ao componente NOTFOUND', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    act(() => {
      history.push('/snoopy');
    });
    const notfound = getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(notfound).toBeInTheDocument();
  });
});
