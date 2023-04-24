const {
    createRoom,
    joinRoom
} = require("../data/Room");
module.exports = {
    postCreateRoom: async function (req, res, next) {
        try {
            let result = await createRoom(
                req.body?.room_name,
                req.body?.user_name
            );
            res.send(result);
        } catch (err) {
            res.next(err);
        }
    },
    postJoinRoom: async function (req, res, next) {
        try {
            let result = await joinRoom(
                req.body?.room_name
            );
            res.send(result);
        } catch (err) {
            res.next(err);
        }
    }
}