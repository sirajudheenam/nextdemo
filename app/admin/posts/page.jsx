import PostsList from "@/app/admin/components/PostsList";
import PostsMenu from "@/app/admin/components/PostsMenu";
// import PostsFeed from "@/app/admin/components/PostsFeed";
function PostsPage() {
    return (
        <>
            <PostsMenu />
            <PostsList />
            {/* <PostsFeed /> */}

        </>
    );
}

export default PostsPage;