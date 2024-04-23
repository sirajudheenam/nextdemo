"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from 'react';
import { useSession } from "next-auth/react";
import FormTodo from "@/components/FormTodo";

const UpdateTodo = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const searchParams = useSearchParams();
    const todoId = searchParams.get("id");
    const [submitting, setIsSubmitting] = useState(false);
    const [isCompleted, setIsCompleted,] = useState(false);
    const [todo, setTodo] = useState({
        executor: session?.user?.email,
        title: "",
        completed: false,
    });



    useEffect(() => {
        const getTodoDetails = async () => {
            const response = await fetch(`/api/db/todos/${todoId}`);
            const data = await response.json();
            const executor = data.executor ? data.executor : session?.user?.email;
            setTodo({
                executor: executor,
                title: data.title,
                completed: data.completed,
            });
        };

        if (todoId) getTodoDetails();
    }, [todoId, session?.user?.email]);

    const updateTodo = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!todoId) return alert("Missing TodoId!");

        try {
            const response = await fetch(`/api/db/todos/${todoId}`, {
                method: "PATCH",
                body: JSON.stringify({ todo: todo }),
            });

            if (response.ok) {
                router.push("/todos");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        // You could have a loading skeleton as the `fallback` too
        <FormTodo
            type='Edit'
            todo={todo}
            setTodo={setTodo}
            submitting={submitting}
            isCompleted={isCompleted}
            setIsCompleted={setIsCompleted}
            handleSubmit={updateTodo}
        />
    );
};

// export default UpdateTodo;
export default function UpdateTodoWithSuspense() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UpdateTodo />
        </Suspense>
    );
}