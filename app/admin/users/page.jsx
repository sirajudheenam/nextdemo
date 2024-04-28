
import { getUsersFromJSON, getUsersFromDB } from '@/app/admin/users/actions';
import UserOperations from '@/app/admin/users/UserOperations';

export default async function Page(req) {
    const jsonUserData = await getUsersFromJSON();
    const dbUserData = await getUsersFromDB();

    return <main>
        <UserOperations users={jsonUserData} />
        {/* <h1>Users from JSON</h1>
        <pre>{JSON.stringify(jsonUserData, null, 2)}</pre> */}
        <h1>Users from DB</h1>
        <pre>{JSON.stringify(dbUserData, null, 2)}</pre>
    </main >;
}



// "use client";

// import Image from 'next/image';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import UsersMenu from '@/app/admin/components/UsersMenu';

// function UserFromDB({ user }) {

//     return (
//         <li key={user?._id} className="flex items-center justify-between p-4 bg-white bg-opacity-30 backdrop-blur-lg rounded-lg">
//             <div>
//                 <p className="text-lg font-semibold text-gray-800">Email: {user?.email}</p>
//                 <p className="text-sm text-gray-600">Username: {user?.username}</p>
//             </div>
//             {user?.image && (
//                 <div className="flex-shrink-0 ml-4">
//                     <img src={user.image} alt="User Image" width={16} height={16} className="w-16 h-16 rounded-full" />
//                 </div>
//             )}
//             <Link href={`/admin/users/${user._id}`}>Link</Link>
//         </li >
//     );
// }

// const UsersFromDB = () => {
//     const [userList, setUserList] = useState([]);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const response = await fetch('/api/db/users');
//                 const data = await response.json();
//                 setUserList(data);
//             } catch (error) {
//                 console.error('Error fetching users:', error);
//             }
//         };
//         fetchUsers();
//     }, []);

//     // useEffect(() => { userList && console.log("userList: ", userList); }, [userList]);

//     return (
//         <div className="min-h-screen bg-gray-100 flex justify-center items-center">
//             <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-lg">
//                 {userList && userList.length > 0
//                     ?
//                     (<h1 className="text-3xl font-bold text-gray-800 mb-4">Users from DB </h1>)
//                     :
//                     (<h1 className="text-3xl font-bold text-gray-800 mb-4">No DB Users found !!</h1>)
//                 }
//                 <ul className="space-y-4">
//                     {userList && userList.length > 0 && (userList?.map((user) => (
//                         <UserFromDB user={user} key={user._id} />

//                     )))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// function UserFromJSON({ user }) {

//     return (
//         <li key={user?.email} className="flex items-center justify-between p-4 bg-white bg-opacity-30 backdrop-blur-lg rounded-lg">
//             <div>
//                 <p className="text-lg font-semibold text-gray-800">Email: {user?.email}</p>
//                 <p className="text-sm text-gray-600">Username: {user?.username}</p>
//             </div>
//             {user?.image && (
//                 <div className="flex-shrink-0 ml-4">
//                     <img src={user.image} alt="User Image" width={16} height={16} className="w-16 h-16 rounded-full" />
//                 </div>
//             )}
//             {/* <Link href={`/admin/users/${user.email}`}>Link</Link> */}
//         </li >
//     );
// }

// const UsersFromJSON = () => {
//     const [userList, setUserList] = useState([]);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const response = await fetch('/api/json/users');
//                 const data = await response.json();
//                 setUserList(data);
//             } catch (error) {
//                 console.error('Error fetching users:', error);
//             }
//         };
//         fetchUsers();
//     }, []);
//     return (
//         <div className="min-h-screen bg-gray-100 flex justify-center items-center">
//             <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-lg">
//                 {userList && userList.length > 0
//                     ?
//                     (<h1 className="text-3xl font-bold text-gray-800 mb-4">Users From JSON </h1>)
//                     :
//                     (<h1 className="text-3xl font-bold text-gray-800 mb-4">No JSON Users found !!</h1>)
//                 }
//                 <ul className="space-y-4">
//                     {userList && userList.length > 0 && (userList?.map((user) => (
//                         <UserFromJSON user={user} key={user.email} />

//                     )))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default function UsersPage() {
//     return (
//         <div>
//             <UsersMenu />
//             <UsersFromDB />
//             <UsersFromJSON />
//         </div>
//     );
// }
