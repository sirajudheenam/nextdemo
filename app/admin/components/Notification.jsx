function Notification({ children }) {
    return (
        <div className="bg-green-200 text-green-800 p-3 mb-4 rounded-md">
            {children}
        </div>
    );
}

export default Notification;