'use client';
import PostsFeed from "@/components/PostsFeed";
import Loading from "@/components/Loading";
import { Suspense } from "react";
import { useSession } from "next-auth/react";

const PostsHome = () => {
    const { data: session } = useSession();
    // console.log("session:", session);
    // const sampleGoogleSession = {
    //     user: {
    //         email: "user@gmail.com",
    //         image: "https://lh3.googleusercontent.com/a/SHAHASH256",
    //         name: "FirstName LastName",
    //     }
    // };
    return (
        session ? (<section className='w-full flex-center flex-col' >
            <h1 className='head_text text-center'>
                Beautiful Blog Posts
                <br className='max-md:hidden' />
                <span className='orange_gradient text-center'> Your Creativity</span>
            </h1>
            <p className='desc text-center'>
                Your thoughts are composed in a nice Blog Post
            </p>
            <Suspense fallback={<Loading />}>
                <PostsFeed session={session} />
            </Suspense>
        </section >) : (<div>Please login</div>)
    );
};

export default PostsHome;