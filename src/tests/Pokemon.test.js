import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemonList from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Testa o compomente pokemon', () => {
  test('Testa se o card rendiraza com as informações do pokemon', () => {
    const { getByTestId, getByRole } = renderWithRouter(<App />);
    const name = getByTestId('pokemon-name');
    const type = getByTestId('pokemon-type');
    const weight = getByTestId('pokemon-weight');
    const catchPokemon = pokemonList.find((pokemon) => pokemon.name === name.textContent);
    const weightReduce = weight.textContent.split(' ')[2];
    const img = getByRole('img', {
      alt: `${name.textContent} sprite`,
    });

    expect(img).toBeInTheDocument();
    expect(img.src).toBe(catchPokemon.image);
    expect(img.alt).toBe('Pikachu sprite');
    expect(name).toBeInTheDocument();
    expect(catchPokemon.type).toBe(type.textContent);
    expect(weightReduce).toBe(catchPokemon.averageWeight.value);
  });

  test('Se o card possui um Link e se é redirecionado corredamente ao click', () => {
    const { history, getByRole, getByTestId } = renderWithRouter(<App />);
    const moreDetails = getByRole('link', { name: /more details/i });
    const name = getByTestId('pokemon-name').textContent;
    const catchPokemon = pokemonList.find((pokemon) => pokemon.name === name);

    expect(moreDetails).toBeInTheDocument();

    userEvent.click(moreDetails);

    expect(history.location.pathname).toBe(`/pokemon/${catchPokemon.id}`);
  });

  test('Se existe um icone de estrela nos pokémon favoritados', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);

    const moreDetails = getByRole('link', { name: /more details/i });

    userEvent.click(moreDetails);

    const favMark = getByText(/pokémon favoritado\?/i);
    const homeBtn = getByRole('link', { name: /home/i });

    userEvent.click(favMark);
    userEvent.click(homeBtn);

    const favImg = getByRole('img', { name: /pikachu is marked as favorite/i });
    console.log(favImg.alt);
    expect(favImg).toBeInTheDocument();
    expect(favImg.src).toBe('http://localhost/star-icon.svg');
    expect(favImg.alt).toBe('Pikachu is marked as favorite');
  });
});
