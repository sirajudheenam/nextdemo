"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from 'react';

import Form from "@/components/Form";

const UpdatePost = () => {
    const router = useRouter();

    const searchParams = useSearchParams();
    const postId = searchParams.get("id");

    const [post, setPost] = useState({ title: "", body: "", tag: "", });
    const [submitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const getPostDetails = async () => {
            const response = await fetch(`/api/post/${postId}`);
            const data = await response.json();

            setPost({
                title: data.title,
                body: data.body,
                tag: data.tag,
            });
        };

        if (postId) getPostDetails();
    }, [postId]);

    const updatePost = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!postId) return alert("Missing PromptId!");

        try {
            const response = await fetch(`/api/prompt/${postId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
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
        // You could have a loading skeleton as the `fallback` too
        <Form
            type='Edit'
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePost}
        />
    );
};

// export default UpdatePost;
export default function UpdatePostWithSuspense() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UpdatePost />
        </Suspense>
    );
}