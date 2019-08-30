import okrobot from "okrobot-js";
import Server from "./server";

let server = new Server();

let OK = true;

class User {

    static async getAll() {
        if (OK) {
            return await okrobot.user.getAll();
        }

        return await server.get('user/all');
    }

    // static async get(userId) {
    //     if (OK) {
    //         return await okrobot.user.get(userId);
    //     }

    //     return await server.get('user/get',userId);
    // }

    static async add(groupName, name, httpKey, httpSecret, passphrase) {
        if (OK) {
            return await okrobot.user.add(groupName, name, httpKey, httpSecret, passphrase);
        }

        return await server.post('user/add');
    }

    static async update(userId, data) {
        if (OK) {
            return await okrobot.user.update(userId, data);
        }

        return await server.post('user/all');
    }

    static async remove(userId) {
        if (OK) {
            return await okrobot.user.remove(userId);
        }

        return await server.post('user/all');
    }
}

export default User;