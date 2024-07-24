const fakeApiUrl = 'https://jsonplaceholder.typicode.com/todos';


interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch(fakeApiUrl);
  const data: Todo[] = await response.json();
  return data;
}

async function createTodo(title: string): Promise<Todo> {
  const response = await fetch(fakeApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });
  const data: Todo = await response.json();
  return data;
}

export { fetchTodos, createTodo };
export type { Todo };