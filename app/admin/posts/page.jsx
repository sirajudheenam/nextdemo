import PostsList from "@/app/admin/components/PostsList";
import PostsMenu from "@/app/admin/components/PostsMenu";
function PostsPage() {
    return (
        <>
            <PostsMenu />
            <PostsList />
        </>
    );
}

export default PostsPage;