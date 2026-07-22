export function OnlineUsers({ users }) {
    return (
        <div>
            <h2>Online</h2>

            {users.map((user,index) => (
                <div key={user.sockId}>
                    {index + 1}🟢 {user.name}
                </div>
            ))}
        </div>
    );
}