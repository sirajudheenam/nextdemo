'use client';
import { useEffect, useState } from 'react';
import ConfirmationDialog from '@/app/admin/components/ConfirmationDialog';
import { useSession } from 'next-auth/react';

export default function Page() {
    // const todosLocalStore = window?.localStorage?.getItem("todosLocal") ? JSON.parse(localStorage.getItem("todosLocal")) : null;
    // console.log("todosLocalStore", todosLocalStore);

    const { data: session } = useSession();

    const [todosFromJSON, setTodosFromJSON] = useState([]);
    const [todosFromDB, setTodosFromDB] = useState([]);
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
    const [isFetchFirst, setIsFetchFirst] = useState(false);

    const todosSizeinDB = todosFromDB.length;
    const todosFromDBEmpty = todosSizeinDB > 0 ? false : true;

    const fetchTodosFromJSON = async () => {
        try {
            const response = await fetch('/api/json/todos');
            if (!response.ok) {
                throw new Error('Failed to fetch todos from JSONPlaceholder');
            }
            const data = await response.json();
            console.log("Todos from JSON", data);
            setTodosFromJSON(data);
        } catch (error) {
            console.error('Error fetching todos from JSON:', error);
        }
    };

    const fetchTodosFromDB = async () => {

        try {
            const response = await fetch('/api/db/todos'); // Assuming this is your custom API route
            if (!response.ok) {
                throw new Error('Failed to fetch todos from DB');
            }
            const resp = await response.json();
            setTodosFromDB(resp);
        } catch (error) {
            console.error('Error fetching todos from DB:', error);
        }
    };

    const seedTodosToDB = async () => {
        // const todos = Array.from(todosFromJSON);

        // todos.forEach(object => {
        //     object.executor = session?.user?.email;
        // });
        // console.log("Todos to be seeded [updated]", todos);
        const todos = [
            {
                title: "title",
                completed: false,
                userId: 1,
                executor: session?.user?.email

            }
        ];
        [1, 2, 4, 5, 6].forEach((i) => {
            todos.push({
                title: `title ${i}`,
                completed: false,
                userId: i,
                executor: session?.user?.email
            });
        });
        try {
            const resp = await fetch('/api/db/todos', {
                method: 'POST',
                body: JSON.stringify({ todos: todos }),
            });
            console.log("resp:", resp);
            if (!resp.ok) {
                throw new Error('Error seeding Todos to the database');
            }
            const data = await response.json();
            console.log("After seeding Todos Response", data);// Database seeded successfully
            if (resp.ok) {
                router.push("/admin/todos");
            }
        } catch (err) {
            console.error('Error seeding Todos to the database:', err);
            return { err: err.message };
        }
    };

    const deleteAllTodosFromDB = () => {
        // Open confirmation dialog
        setIsDeleteConfirmationOpen(true);
    };

    const confirmDeleteAllTodosFromDB = async () => {
        try {
            // Careful : DELETES all records in the Table
            const resp = await fetch('/api/db/todos', {
                method: 'DELETE',
            });
            if (!resp.ok) {
                throw new Error('Error deleting All Todos in the database');
            }
            const todosResp = await resp.json();
            // For demonstration, you can clear the todos array state
            setTodosFromDB([]);
            // Closes confirmation dialog
            setIsDeleteConfirmationOpen(false);
            return todosResp;

        } catch (error) {
            console.error('Error deleting todos from DB:', error);
        }
    };

    const cancelDeleteAllTodosFromDB = () => {
        // Cancel deletion
        setIsDeleteConfirmationOpen(false);
    };

    useEffect(() => {
        fetchTodosFromJSON();
        fetchTodosFromDB();
    }, []);


    return (
        <>
            <h1 className="text-3xl font-bold mb-4">ToDos Operations</h1>
            <div className="flex flex-row space-between max-w-lg mx-auto mt-8 mb-20">

                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                    onClick={fetchTodosFromJSON}
                >
                    Fetch All Todos from JSON
                </button>

                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                    onClick={seedTodosToDB}
                >
                    Seed ToDos to DB
                </button>

                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
                    onClick={fetchTodosFromDB}
                >
                    Fetch All ToDos from DB
                </button>

                <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                    onClick={deleteAllTodosFromDB}
                >
                    Delete All Todos from DB
                </button>
            </div>
            {/* Total ToDos in DB */}
            <div >
                <h2 className="text-2xl font-bold mt-8">Total Todos in DB: {todosSizeinDB}</h2>
            </div>

            {/* Confirmation Dialog */}
            {isDeleteConfirmationOpen && (
                <ConfirmationDialog
                    dialogTitle={"Are you sure you want to delete all todos?"}
                    labelFirstButton={"Yes, Delete All"}
                    labelSecondButton={"Cancel"}
                    handleClickFirst={confirmDeleteAllTodosFromDB}
                    handleClickSecond={cancelDeleteAllTodosFromDB} />
            )}
            {/* todosFromJSON List  */}
            {/* <div className="max-w-lg mx-auto mt-8">
                <h2 className="text-2xl font-bold mb-4">Todos List from JSON</h2>
                <ul>
                    {todosFromJSON.map((todo) => (
                        <li key={todo.id} className="text-lg">
                            Title:  {todo.title} : Status: {todo.status ? 'Completed' : 'Pending'}
                        </li>
                    ))}
                </ul>
            </div> */}

            {/* Raw JSON - todosFromJSON */}
            {/* <div className="max-w-lg mx-auto mt-8">
                <h2 className="text-2xl font-bold mb-4">Todos from JSON</h2>
                <pre>{JSON.stringify(todosFromJSON, null, 2)}</pre>
            </div> */}
            {/* Raw JSON - todosFromDB */}
            {/* <div className="max-w-lg mx-auto mt-8">
                <h2 className="text-2xl font-bold mb-4">Todos from DB</h2>
                <pre>{JSON.stringify(todosFromDB, null, 2)}</pre>
            </div> */}
        </>

    );
}
