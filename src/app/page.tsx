import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import CreateTodo from "~/app/_components/create-todo";
import { revalidatePath } from "next/cache";

async function TodoList() {
  const todo = await api.todo.getMyTods();

  async function deleteTodo(id: string) {
    "use server";
    await api.todo.delete({ id });
    revalidatePath("/");
  }

  return (
    <ul>
      {todo.map((t) => (
        <li key={t.id}>
          {t.title}
          <form action={deleteTodo.bind(null, t.id)}>
            <button type="submit">Delete</button>
          </form>
        </li>
      ))}
    </ul>
  );
}
export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main>
      {session?.user ? (
        <>
          <CreateTodo />
          <TodoList />
        </>
      ) : null}
    </main>
  );
}
