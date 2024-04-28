'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function TodosHome() {
    const [todos, setTodos] = useState([]);
    // const { data: session } = useSession();
    const router = useRouter();

    const handleEdit = (todo) => {
        router.push(`/todos/update-todo?id=${todo._id}`);
    };

    const handleDelete = (id) => {

        const fetchTodos = async () => {
            const res = await fetch(`/api/db/todos/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                console.log(`todo with id ${id} deleted successfully`);
                setTodos(todos.filter((t) => t._id !== id));
            } else {
                console.log('Something is wrong babe ! Unable to delete');
            }
        };
        fetchTodos();
    };

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await fetch('/api/db/todos');
            const data = await response.json();
            setTodos(data);
        };
        fetchTodos();
    }, []);

    return (
        <>
            <div>ToDos Home</div>
            {/* List of Todos fetched from API */}
            {todos && todos.length > 0 ? (<ul>
                {todos.map((todo) => (
                    <li key={todo._id}>
                        {todo.title}
                        <button onClick={() => handleEdit(todo)}>Edit</button>
                        <button onClick={() => handleDelete(todo._id)}>Delete</button>
                    </li>
                ))}
            </ul>) : <h1>Oops... No ToDos found.. Wanna create one ?? </h1>}
        </>

    );
}

export default TodosHome;