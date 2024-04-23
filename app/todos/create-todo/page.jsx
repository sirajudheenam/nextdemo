"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, redirect } from "next/navigation";


import FormTodo from "@/components/FormTodo";

const CreateTodo = () => {
    const router = useRouter();

    const { data: session } = useSession();

    console.log("session");
    console.log(session);

    console.log(session?.user?.email);
    console.log('router', router);
    const [submitting, setIsSubmitting] = useState(false);
    const [isCompleted, setIsCompleted,] = useState(false);

    const [todo, setTodo] = useState({
        executor: "",
        title: "",
        completed: isCompleted ? isCompleted : false,
    });

    const createTodo = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        console.log("session?.user?.email", session?.user?.email);
        try {
            const response = await fetch("/api/db/todos/new", {
                method: "POST",
                body: JSON.stringify({
                    executor: session?.user?.email,
                    title: todo.title,
                    completed: isCompleted,
                }),
            });

            if (response.ok) {
                router.push("/todos");
            }
            // if (response.ok) {
            //     redirect('/todos');
            // }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <FormTodo
            type='Create'
            todo={todo}
            setTodo={setTodo}
            submitting={submitting}
            isCompleted={isCompleted}
            setIsCompleted={setIsCompleted}
            handleSubmit={createTodo}
        />
    );
};

export default CreateTodo;