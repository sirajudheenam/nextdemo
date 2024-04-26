'use server';
import { revalidatePath } from "next/cache";
import { sql } from "@vercel/postgres";
import { z } from "zod";

// Create the table todos2 directly on Vercel Query console ;
// CREATE TABLE todo2s(id SERIAL PRIMARY KEY, text TEXT NOT NULL) IF NOT EXISTS;
// export async function createTable() {
//     sql`CREATE TABLE todos2(id SERIAL PRIMARY KEY, text TEXT NOT NULL) IF NOT EXISTS;`
//     return { message: `Table created` };
// }
export async function createTodo(prevState: any, formData: FormData) {
    const schema = z.object({
        todo: z.string().nonempty(),
    })
    const data = schema.parse({
        todo: formData.get('todo'),
    })
    try {

        await sql`INSERT INTO todos2 (text) 
        VALUES (${data.todo})`
        revalidatePath('/admin/formhandling')
        // TODO: Checkout other revalidation options from Next.js
        // revalidateTag('todos')
        // unstable_cache(...)

        return { message: `Added todo ${data.todo}` };
    } catch (err) {
        return { message: `Failed to add ${data.todo}.` };
    }
}

export async function deleteTodo(prevState: any, formData: FormData) {
    const schema = z.object({
        id: z.string().nonempty(),
        todo: z.string().nonempty(),
    })
    const data = schema.parse({
        id: formData.get('id'),
        todo: formData.get('todo'),
    })
    try {
        await sql`DELETE FROM todos2 
        WHERE id=${data.id}`

        revalidatePath('/admin/formhandling')

        return { message: `Deleted todo ${data.todo} ` };
    } catch (err) {
        return { message: `Failed to add ${data.todo}.` };
    }
}



// export async function updateUser(userId, formData) {
//     console.log("updateUser: ", userId, formData);

//     return { appendedUser: `Hello, ${ userId } ` };
// }