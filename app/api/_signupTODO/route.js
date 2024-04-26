// Traditional way of getting users signed up
// Use Server Actions instead
export const POST = async (req, res) => {
    if (req.method === 'POST') {
        const { name, email, password } = await req.json();

        console.log("name, email, password:", name, email, password);
        // Simulate signup logic (replace with actual signup logic)
        try {
            // Example: save user to database
            console.log(`New user signed up - Name: ${name}, Email: ${email}`);
            console.log("Password: ", password);
            // Add your logic to SignUp.

            // Respond with success message
            return new Response(JSON.stringify({ message: 'User signed up successfully!' }), { status: 200 });

        } catch (error) {
            console.error('Error during signup:', error);
            // res.status(500).json({ error: 'Signup failed' });
            return new Response(JSON.stringify({ error: 'Signup failed' }), { status: 500 });
        }
    } else {
        return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 500 });
    }
};
