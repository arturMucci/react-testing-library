import { act } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import '@testing-library/jest-dom';

test('Se aparece a devida imagem', () => {
  const { history, getByRole } = renderWithRouter(<App />);

  act(() => {
    history.push('/noutfond');
  });

  const title = getByRole('heading', { name: /page requested not found/i });
  const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const img = getByRole('img', { name: /pikachu crying because the page requested was not found/i });

  expect(img).toBeInTheDocument();
  expect(img.src).toBe(imgSrc);
  expect(title).toBeInTheDocument();
});
