import React, { use, useState } from 'react';

const Users = ({ usersPromise }) => {
    const initialUsers = use(usersPromise);
    const [users, setUsers] = useState(initialUsers);

    // event handler for submit form data
    const handleAddUser = (e) =>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const newUser = {name, email};
        console.log(newUser);

        fetch("http://localhost:3000/users", {
            method: "POST",
            headers:{
                "content-type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(data => {
            console.log("After post",data)
            const newUsers = [...users,data];
            setUsers(newUsers);
            e.target.reset();
        })

    }

    return (
        <div>
            <div>
                <h3>Add a user</h3>
                <form onSubmit={handleAddUser}>
                    <input type="text" name="name" id="" placeholder='Enter name' /><br />
                    <input type="email" name="email" id="" placeholder='Enter email' /><br />
                    <button>Add user</button>
                </form>
            </div>
            <div>
                {users.map(user => <p key={user.id}>{user.name} Email:{user.email}</p>)}
            </div>
        </div>
    );
};

export default Users;