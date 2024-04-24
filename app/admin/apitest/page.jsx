import ApiTester from "@/app/admin/apitest/APITester";
import Posts from "@/app/admin/apitest/Posts";

function page() {
    return (
        <>
            <Posts />
            <ApiTester />
        </>
    );
}

export default page;