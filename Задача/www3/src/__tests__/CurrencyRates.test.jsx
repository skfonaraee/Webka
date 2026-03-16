// 10 задание
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import CurrencyRates from '../CurrencyRates';

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('отображает курсы после успешной загрузки', async () => {
  server.use(
    rest.get('https://open.er-api.com/v6/latest/USD', (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          result: 'success',
          time_last_update_utc: 'Mon, 16 Mar 2026 10:00:00 +0000',
          base_code: 'USD',
          rates: {
            USD: 1,
            EUR: 0.925,
            KZT: 485.75,
          },
        })
      );
    })
  );

  render(<CurrencyRates />);

  // Проверяем начальное состояние загрузки
  expect(screen.getByText('Загрузка курсов...')).toBeInTheDocument();

  // Ждём появления данных
  await waitFor(() => {
    expect(screen.getByText(/1 USD = 0.925 EUR/)).toBeInTheDocument();
    expect(screen.getByText(/1 USD = 485.75 KZT/)).toBeInTheDocument();
  });

  // Проверяем, что загрузка исчезла
  expect(screen.queryByText('Загрузка курсов...')).not.toBeInTheDocument();

  // Кнопка обновления должна быть активна
  expect(screen.getByRole('button', { name: /Обновить данные/i })).toBeEnabled();
});

test('показывает ошибку при неудачном запросе (не 200)', async () => {
  server.use(
    rest.get('https://open.er-api.com/v6/latest/USD', (req, res, ctx) => {
      return res(ctx.status(503));
    })
  );

  render(<CurrencyRates />);

  await waitFor(() => {
    expect(screen.getByText(/API недоступен/i)).toBeInTheDocument();
  });

  expect(screen.queryByText(/EUR/)).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Обновить данные/i })).toBeEnabled();
});

test('показывает ошибку при некорректном ответе API', async () => {
  server.use(
    rest.get('https://open.er-api.com/v6/latest/USD', (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ result: 'error', error_type: 'invalid_key' })
      );
    })
  );

  render(<CurrencyRates />);

  await waitFor(() => {
    expect(screen.getByText(/Ошибка в ответе API/i)).toBeInTheDocument();
  });
});