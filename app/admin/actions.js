'use server';

export async function updateUser(userId, formData) {
    console.log("updateUser: ", userId, formData);

    return { appendedUser: `Hello, ${userId}` };
}