"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Profile from "@/components/Profile";
import FeedByUser from "@/components/PostsFeedByUser";

const MyProfile = () => {
    const router = useRouter();
    const { data: session, status } = useSession();

    const [myPosts, setMyPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const postData = await response.json();

            setMyPosts(postData);
        };
        if (session?.user.id) fetchPosts();
    }, [session?.user.id]);

    const handleEdit = (post) => {
        router.push(`/update-post?id=${post._id}`);
    };

    const handleDelete = async (post) => {
        const hasConfirmed = confirm(
            "Are you sure you want to delete this post?"
        );

        if (hasConfirmed) {
            try {
                await fetch(`/api/post/${post._id.toString()}`, {
                    method: "DELETE",
                });

                const filteredPosts = myPosts.filter((item) => item._id !== post._id);

                setMyPosts(filteredPosts);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const UserDetails = ({ session, status }) => {
        return (
            <div className="bg-white rounded-lg shadow-lg p-6">
                <ul className="space-y-4">
                    <li className="text-lg font-semibold">Name: {session?.user?.name}</li>
                    <li>ID: {session?.id}</li>
                    <li>Email: {session?.user?.email}</li>
                    <li>Image: {session?.user?.image ? <Image src={session?.user?.image} className="w-20 h-20 rounded-full" alt="User Image" height={20} width={20} /> : 'No image'}</li>
                    <li>Expires: {session?.expires}</li>
                    <li>Authenticated (session status): <span className={status === 'authenticated' ? 'text-green-600' : 'text-red-600'}>{status === 'authenticated' ? 'yes' : 'no'}</span></li>
                </ul>
            </div>
        );
    };

    return (
        <>
            <Profile
                name='My'
                desc={`Welcome to your personalized profile page. Share your exceptional posts and inspire others with the power of your imagination`}
                data={myPosts}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
            <UserDetails session={session} status={status} />
            <FeedByUser />
        </>
    );
};

export default function MyProfileSuspense() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MyProfile />
        </Suspense>
    );
}