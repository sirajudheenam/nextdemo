export default function layout({ children }) {
    return (
        <>
            <div>Admin Header</div>
            <h1>From Layout </h1>
            <div>{children}</div>
        </>
    );
}
