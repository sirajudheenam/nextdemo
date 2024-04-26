'use client'

import { useFormState, useFormStatus } from "react-dom";
import { createTodo } from '@/app/admin/formhandling/actions'

const initialState = {
    message: null
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            aria-disabled={pending}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${pending ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={pending}
        >
            Add
        </button>
    )
}
export function AddForm() {
    const [state, formAction] = useFormState(createTodo, initialState);

    return (
        <>
            <form action={formAction} className="max-w-md mx-auto mt-8 p-4 border border-gray-300 rounded shadow-lg">
                <input
                    type="text"
                    id="todo"
                    name="todo"
                    required
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    placeholder="Enter your todo..."
                />
                <SubmitButton />
                <p
                    aria-live="polite"
                    className="sr-only"
                    role="status"
                >
                    {state?.message}
                </p>
            </form>
        </>
    )
}