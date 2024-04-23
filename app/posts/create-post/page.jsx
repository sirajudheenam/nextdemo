"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@/components/Form";

const CreatePost = () => {
    const router = useRouter();
    const { data: session } = useSession();

    console.log("session");
    console.log(session);

    console.log(session?.user.id);
    const [submitting, setIsSubmitting] = useState(false);
    const [post, setPost] = useState({ title: "", body: "", tag: "" });

    const createPost = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/db/posts/new", {
                method: "POST",
                body: JSON.stringify({
                    title: post.title,
                    body: post.body,
                    userId: session?.user.id,
                    tag: post.tag,
                }),
            });

            if (response.ok) {
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form
            type='Create'
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPost}
        />
    );
};

export default CreatePost;