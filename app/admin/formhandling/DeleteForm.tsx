'use client'

import { useFormState, useFormStatus } from "react-dom";
import { deleteTodo } from '@/app/admin/formhandling/actions'

const initialState = {
    message: null
}

function DeleteButton() {
    const { pending } = useFormStatus()
    return (
        <button
            type="submit"
            aria-disabled={pending}
            className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${pending ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={pending}
        >
            Delete
        </button>
    )
}
export function DeleteForm({ id, todo }: { id: number, todo: string }) {
    const [state, formAction] = useFormState(deleteTodo, initialState);

    return (
        <form action={formAction} className="max-w-md mx-auto mt-4 p-4 border border-gray-300 rounded shadow-lg">
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="todo" value={todo} />
            <DeleteButton />
            <p
                aria-live="polite"
                className="sr-only"
                role="status"
            >
                {state.message}
            </p>
        </form>

    )
}