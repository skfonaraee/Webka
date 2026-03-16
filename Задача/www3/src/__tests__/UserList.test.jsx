// __tests__/UserList.test.jsx
// 4 задание
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import UserList from '../UserList';

const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, name: 'Leanne Graham', email: 'Sincere@april.biz' },
        { id: 2, name: 'Ervin Howell',   email: 'Shanna@melissa.tv' },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('отображает список пользователей после загрузки', async () => {
  render(<UserList />);

  // сначала должна быть загрузка
  expect(screen.getByText('Загрузка...')).toBeInTheDocument();

  // ждём появления данных
  await waitFor(() => {
    expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    expect(screen.getByText('Sincere@april.biz')).toBeInTheDocument();
  });

  // загрузки уже не должно быть
  expect(screen.queryByText('Загрузка...')).not.toBeInTheDocument();
});

test('показывает ошибку при сбое сервера', async () => {
  server.use(
    rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<UserList />);

  await waitFor(() => {
    expect(screen.getByText(/Ошибка/i)).toBeInTheDocument();
  });
});