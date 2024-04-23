'use client';
import PostsFeed from "@/components/PostsFeed";
import Loading from "@/components/Loading";
import { Suspense } from "react";

const PostsHome = () => {
    return (
        <section className='w-full flex-center flex-col'>
            <h1 className='head_text text-center'>
                Beautiful Blog Posts
                <br className='max-md:hidden' />
                <span className='orange_gradient text-center'> Your Creativity</span>
            </h1>
            <p className='desc text-center'>
                Your thoughts are composed in a nice Blog Post
            </p>
            <Suspense fallback={<Loading />}>
                <PostsFeed />
            </Suspense>
        </section>
    );
};

export default PostsHome;