'use client';
function UserOperations({ users }) {
    const seedUsers = async () => {
        // console.log('Seeding Users:', users);
        try {
            const response = await fetch('/api/db/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ users: users })
            });
            const data = await response.json();
            // console.log('Seed Users:', data);
        } catch (error) {
            console.error('Error seeding users:', error);
        }
    };
    const deleteUsers = async () => {
        try {
            const response = await fetch('/api/db/users', {
                method: 'DELETE',
                body: JSON.stringify({ users: users })
            });
            const data = await response.json();
            console.log('Delete Users:', data);
        } catch (error) {
            console.error('Error deleting users:', error);
        }
    };
    return (
        <div>
            <h1>User Operations</h1>
            <button onClick={seedUsers} >Seed Users</button>
            <button onClick={deleteUsers} >Delete Users</button>
        </div>
    );
}

export default UserOperations;