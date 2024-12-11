type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export async function getTodos() {
  const data = await fetch(`${process.env.API_URL}/todos`)
    .then((res) => res.json())
    .then((data) => data as Todo[]);

  return data;
}

export async function getUserTodos(userId: number | string) {
  const data = await fetch(`${process.env.API_URL}/users/${userId}/todos`)
    .then((res) => res.json())
    .then((data) => data as Todo[]);
  return data;
}

function wait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}
