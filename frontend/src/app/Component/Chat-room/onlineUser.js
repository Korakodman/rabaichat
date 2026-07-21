export function OnlineUsers({ users }) {
    return (
        <div>
            <h2>Online</h2>

            {users.map((user) => (
                <div key={user.sockId}>
                    🟢 {user.name}
                </div>
            ))}
        </div>
    );
}