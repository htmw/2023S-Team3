module.exports = {
    createRoom: async function (room_name, user_name) {
        let data = [];
        data = await new Promise((resolve, reject) => {
            connection.query(
                "call simply_online.create_room(?,?,?,?,?,?,?,?,?,?)",
                [room_name, user_name, null, null, null, null, null, null, null, null],
                function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(JSON.parse(JSON.stringify(result)));
                    }
                }
            );
        });
        return data;
    },
    joinRoom: async function (room_name) {
        let data = [];
        data = await new Promise((resolve, reject) => {
            connection.query(
                "call simply_online.get_room_details(?)",
                [room_name],
                function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(JSON.parse(JSON.stringify(result)));
                    }
                }
            );
        });
        return data;
    },
}