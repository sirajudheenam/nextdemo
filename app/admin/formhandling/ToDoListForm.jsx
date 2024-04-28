'use server';
import { sql } from '@vercel/postgres';
import { AddForm } from '@/app/admin/formhandling/AddForm';
import { DeleteForm } from '@/app/admin/formhandling/DeleteForm';

export default async function ToDoListForm() {

    // console.log("ENV: ", process.env.POSTGRES_URL);
    let data = await sql`SELECT * FROM todos2`;
    const { rows: todos } = data;

    return (
        <main className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="sr-only">Todos</h1>
            <AddForm />
            <ul className="mt-8">
                {todos.length > 0 &&
                    todos.map((todo) => (
                        <li key={todo.id} className="flex items-center justify-between bg-white rounded-lg shadow-md p-4 mb-4">
                            <span className="text-lg">{todo.text}</span>
                            <DeleteForm id={todo.id} todo={todo.text} />
                        </li>
                    ))}
            </ul>
        </main>
    );
}