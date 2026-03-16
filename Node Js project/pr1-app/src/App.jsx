import React from 'react';
import Task1 from './task1/App.jsx';
import Task2 from './task2/App.jsx';
import Task3 from './task3/App.jsx';
import Task4 from './task4/App.jsx';
import Task5 from './task5/App.jsx';

const tasks = {1: Task1, 2: Task2, 3: Task3, 4: Task4, 5: Task5};

function App() {
  // choose task by query string, e.g. ?task=3
  const params = new URLSearchParams(window.location.search);
  const t = parseInt(params.get('task'), 10) || 1;
  const Selected = tasks[t] || Task1;
  return <Selected />;
}

export default App;
