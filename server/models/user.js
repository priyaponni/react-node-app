import { getDatabaseHandler, writeToDB } from './dbHandler.js';


export const generateUsers = async () => {
    let users = [
        {
            "id" : "123",
            "name": "Mark Steward",
            "bids": []
        },
        {
            "id" : "345",
            "name": "Peter Jason",
            "bids": []
        }
    ];
    await writeToDB('users',users);
}

class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.firstName = name.split(' ')[0];
        this.lastName = name.split(' ')[1];
    }
}

export const getUsers = async () => {
    const db = getDatabaseHandler();
    console.log(db.data);
    const users = db.data && db.data.users || [];
    return users.map((u) => {
        return new User(u.id, u.name)
    });
}

export const getUser = async (id, req, res) => {
    const db = getDatabaseHandler();
    console.log(id);

    const users = db.data && db.data.users || [];
    const user = users.find((u ) => u.id === id);
    console.log(user);
    if (!user) {
        return res.status(404).end();
    }
    return new User(user.id, user.name);
}

export const editUser = async (id, req, res) => {
    const db = getDatabaseHandler();
    console.log(id);
    const users = db.data && db.data.users || [];
    users.forEach((u) => {
        if(u.id === id) {
            u.name = req.body.name;
        }
    })
    console.log(users);
    await writeToDB('users', users);

    return users.find((u) => u.id === id);
}