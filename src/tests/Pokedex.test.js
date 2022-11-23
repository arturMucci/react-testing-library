import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import '@testing-library/jest-dom';
import pokemonList from '../data';

describe('Testa o component <Pokedex />', () => {
  test('Se possui o titulo `encoutered pokémon`', () => {
    const { getByRole } = renderWithRouter(<App />);
    const title = getByRole('heading', {
      name: /encountered pokémon/i,
      level: 2,
    });

    expect(title).toBeInTheDocument();
  });

  test('Se Renderiza a lista de pokemon corretamente ao clickar no botão `proximo pokemon`', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const pokeList = pokemonList.map((pokemon) => pokemon.name);
    const btnNextPoke = getByRole('button', {
      name: /próximo pokémon/i,
    });
    /// Testando somente a lista
    // pokeList.forEach((pokemon) => {
    //   const pokeName = getByText(pokemon);
    //   expect(pokeName).toBeInTheDocument();
    //   userEvent.click(btnNextPoke);
    // });
    /// Testando ao reinicar a lista
    for (let index = 0; index <= pokeList.length; index += 1) {
      if (index >= pokeList.length) {
        const pokeName = getByText(pokeList[0]);
        expect(pokeName).toBeInTheDocument();
      } else {
        const pokeName = getByText(pokeList[index]);
        expect(pokeName).toBeInTheDocument();
        userEvent.click(btnNextPoke);
      }
    }
  });

  test('Se é mostrado apenas um pokemon por vez', () => {
    const { queryByText, getByRole, queryAllByText } = renderWithRouter(<App />);
    const btnNextPoke = getByRole('button', {
      name: /próximo pokémon/i,
    });
    const pokeList = pokemonList.map((pokemon) => pokemon.name);
    pokeList.forEach((poke) => {
      const isRender = pokeList.filter((pokemon) => queryByText(pokemon));
      const isUniqe = queryAllByText(poke);
      expect(isUniqe).toHaveLength(1);
      expect(isRender).toHaveLength(1);
      userEvent.click(btnNextPoke);
    });
  });

  test('Se tem os botões de filtro', () => {
    const { getAllByTestId, getByText } = renderWithRouter(<App />);
    const buttons = getAllByTestId('pokemon-type-button');
    const buttonsName = [/electric/i, /fire/i, /bug/i, /poison/i, /psychic/i, /normal/i, /dragon/i];
    buttons.forEach((btn, index) => {
      expect(btn).toHaveTextContent(buttonsName[index]);
    });
    userEvent.click(buttons[1]);
    const charmander = getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();
    userEvent.click(buttons[0]);
    const pikachu = getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });

  test('Se tem o botão de remover os filtos', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const buttonAll = getByRole('button', {
      name: /all/i,
    });
    userEvent.click(buttonAll);
    const pikachu = getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
