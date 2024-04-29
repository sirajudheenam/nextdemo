"use server";

import { revalidateTag } from "next/cache";

export default async function revalidateTagAdminTodos() {

    // tag: A string representing the cache tag associated with the 
    // data you want to revalidate. Must be less than or equal 
    // to 256 characters. This value is case-sensitive.
    // You can add tags to fetch as follows:
    // fetch(url, { next: { tags: [...] } });

    revalidateTag("adminTodos");
}
