module.exports = {
    addAttendanceLog: async function (attendance_id, user_name, room_name) {
        let data = [];
        data = await new Promise((resolve, reject) => {
            connection.query(
                "call simply_online.add_attendance_log(?,?,?)",
                [attendance_id, user_name, room_name],
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
    getAttendanceLogs: async function (attendance_id) {
        let data = [];
        data = await new Promise((resolve, reject) => {
            connection.query(
                "call simply_online.get_attendance_logs(?)",
                [attendance_id],
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
    getLatestAttendanceRecords: async function (room_name) {
        let data = [];
        data = await new Promise((resolve, reject) => {
            connection.query(
                "call simply_online.get_latest_attendance_record(?)",
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
    add_attendance_table: async function (owner_name,room_name) {
        let data = [];
        data = await new Promise((resolve, reject) => {
            connection.query(
                "call simply_online.insert_attendance_table(?, ?)",
                [owner_name, room_name],
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
    }
}