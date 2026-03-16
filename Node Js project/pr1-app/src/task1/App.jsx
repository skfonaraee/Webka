import { useState, useEffect } from 'react';

function App() {
  // 91
  const Greeting = () => <h1>Привет, мир!</h1>;

  // 92 + 93
  const Counter = () => {
    const [count, setCount] = useState(0);
    return (
      <div>
        <p>Счёт: {count}</p>
        <button onClick={() => setCount(c => c + 1)}>+</button>
        <button onClick={() => setCount(c => c - 1)}>-</button>
      </div>
    );
  };

  // 94
  const UserCard = ({ name, age }) => (
    <div>
      <h2>{name}</h2>
      <p>Возраст: {age}</p>
    </div>
  );

  // 95
  const NumberList = () => {
    const nums = [7, 14, 21, 28];
    return (
      <ul>
        {nums.map((n, i) => <li key={i}>{n}</li>)}
      </ul>
    );
  };

  // 97
  const ControlledInput = () => {
    const [text, setText] = useState("");
    return (
      <>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="введи что-нибудь"
        />
        <p>Ты ввёл: {text}</p>
      </>
    );
  };

  // 98
  const DataFetcher = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/todos/1")
        .then(r => r.json())
        .then(setData);
    }, []);
    return data ? <pre>{JSON.stringify(data, null, 2)}</pre> : "Загрузка...";
  };

  // 99
  const Toggle = () => {
    const [show, setShow] = useState(true);
    return (
      <>
        <button onClick={() => setShow(s => !s)}>
          {show ? "Скрыть" : "Показать"}
        </button>
        {show && <p>Этот текст можно прятать</p>}
      </>
    );
  };

  // 100 — самый простой ToDo
  const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");

    const add = () => {
      if (!input.trim()) return;
      setTodos([...todos, input.trim()]);
      setInput("");
    };

    return (
      <div>
        <h2>ToDo</h2>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Новое дело..."
        />
        <button onClick={add}>Добавить</button>
        <ul>
          {todos.map((todo, i) => (
            <li key={i}>
              {todo}
              <button onClick={() => setTodos(todos.filter((_, idx) => idx !== i))}>×</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Тест задач</h1>
      <Greeting />
      <Counter />
      <UserCard name="Kara" age={25} />
      <NumberList />
      <ControlledInput />
      <DataFetcher />
      <Toggle />
      <TodoApp />
    </div>
  );
}

export default App