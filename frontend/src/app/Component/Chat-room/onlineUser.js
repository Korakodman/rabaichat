export function OnlineUsers({ users }) {
    console.log(users)
    return (
        <div>
            <h2>Online</h2>

            {users.map((user,index) => (
                <div key={user.sockId}>
                    {index + 1}🟢 ชื่อ {user.name} บทบาท : {user.role === "speaker" ? "ผู้ฟัง" : ""}
                </div>
            ))}
        </div>
    );
}