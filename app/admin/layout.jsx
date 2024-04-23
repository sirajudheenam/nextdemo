import Notification from '@/app/admin/components/Notification';

const message = "New Message Arrived";
export default function layout({ children }) {
    return (
        <>
            <Notification message={message} />
            <div>{children}</div>
        </>
    );
}
