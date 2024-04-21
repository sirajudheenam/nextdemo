"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PostCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
    const { data: session } = useSession();
    const pathName = usePathname();
    const router = useRouter();

    const [copied, setCopied] = useState("");

    const handleProfileClick = () => {
        if (post?.author?._id === session?.user.id) return router.push("/profile");
        router.push(`/profile/${post?.author?._id}?name=${post?.author?.username}`);
    };

    const handleCopy = () => {
        setCopied(post?.body);
        navigator.clipboard.writeText(post?.body);
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        post && (
            <div className='post_card'>
                <div className='flex justify-between items-start gap-5'>
                    <div
                        className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
                        onClick={handleProfileClick}
                    >
                        <Image
                            src={post?.author?.image ? post.author.image : "/assets/images/logo.svg"}
                            alt='YOYO'
                            width={40}
                            height={40}
                            className='rounded-full object-contain'
                        />

                        <div className='flex flex-col'>
                            <h3 className='font-satoshi font-semibold text-gray-900'>
                                {post?.author?.username}
                            </h3>
                            <p className='font-inter text-sm text-gray-500'>
                                {post?.author?.email}
                            </p>
                        </div>
                    </div>

                    <div className='copy_btn' onClick={handleCopy}>
                        <Image
                            src={
                                copied === post?.body ?
                                    "/assets/icons/tick.svg"
                                    : "/assets/icons/copy.svg"
                            }
                            alt={copied === post?.body ? "tick_icon" : "copy_icon"}
                            width={12}
                            height={12}
                        />
                    </div>
                </div>

                <p className='my-4 font-satoshi text-sm text-gray-700'>{post?.title}</p>
                <p className='my-4 font-satoshi text-sm text-gray-700'>{post?.body}</p>
                <p
                    className='font-inter text-sm blue_gradient cursor-pointer'
                    onClick={() => handleTagClick && handleTagClick(post?.tag)}
                >
                    #{post?.tag}
                </p>

                {session?.user.id === post?.author?._id && pathName === "/profile" && (
                    <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
                        <p
                            className='font-inter text-sm green_gradient cursor-pointer'
                            onClick={handleEdit}
                        >
                            Edit
                        </p>
                        <p
                            className='font-inter text-sm orange_gradient cursor-pointer'
                            onClick={handleDelete}
                        >
                            Delete
                        </p>
                    </div>
                )}
            </div>)
    );
};

export default PostCard;