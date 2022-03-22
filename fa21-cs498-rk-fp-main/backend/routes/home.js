const secrets = require('../config/secrets');

const Task = require("../models/task");
const User = require("../models/UserModel");

const filter = require('../utils/ourFilter')

module.exports = function (router) {

    const homeRoute = router.route('/');
    const usersRoute = router.route('/users');
    const userIdRoute = router.route('/users/:id');
    router.use('/posts', require('./posts')(router))
    router.use('/orders', require('./orders')(router))

    homeRoute.get(function (req, res) {
        let connectionString = secrets.token;
        res.json({message: 'My connection string is ' + connectionString});
    });

    usersRoute.get(async function (req, res) {
        try {
            const Users = await filter(req, User);
            res.status(200);
            res.json({
                message: "OK",
                data: Users
            });
        } catch {
            res.status(500);
            res.json({
                message: "Server not found",
                data: {}
            });
        }
    });

    usersRoute.post(async function (req, res) {
        if (!req.body.email) {
            res.status(500);
            res.json({
                message: "Email required",
                data: {},
            });
        } else {
            req.body.dateCreated = new Date();

            if (!req.body.pendingTasks) req.body.pendingTasks = [];
            const counts = await User.count({"email": req.body.email});
            if (counts > 0) {
                res.status(500);
                res.json({
                    message: "Email already exists",
                    data: {}
                });
            } else {

                const newUser = new User(req.body);
                console.log(req.body);
                const saveUser = await newUser.save();
                res.status(201);
                res.json({
                    message: "OK",
                    data: saveUser
                });
            }
        }
    });

    userIdRoute.get(async function (req, res) {
        const counts = await User.count({_id: req.params.id});
        if (counts <= 0) {
            res.status(404);
            res.json({
                message: "Id doesn't exist, please try again",
                data: {}
            })
        } else {
            const user = await User.findById({_id: req.params.id});

            res.json({
                message: "OK",
                data: user
            });
        }
    });

    async function updateTasks(tasks) {
        for (let i = 0; i < tasks.length; i++) {
            let content = tasks[i];
            content.assignedUser = "";
            content.assignedUserName = "unassigned"
            newContent = JSON.parse(JSON.stringify(content));
            await Task.findByIdAndDelete({_id: content._id});
            await new Task(newContent).save();
        }

    }

    userIdRoute.delete(async function (req, res) {
        const counts = await User.count({_id: req.params.id});
        if (counts <= 0) {
            res.status(404);
            res.json({
                message: "Id doesn't exist, please try again",
                data: {}
            });
        } else {
            const user = await User.find({_id: req.params.id});
            const tasksId = user[0].pendingTasks;
            console.log(typeof (tasksId));
            const tasks = await Task.find({_id: {"$in": tasksId}});
            await updateTasks(tasks);

            const deleteUser = await User.findByIdAndDelete({_id: req.params.id});

            res.status(200);
            res.json({
                message: "OK",
                data: deleteUser
            });
        }
    });

    userIdRoute.put(async function (req, res) {
        const counts = await User.count({_id: req.params.id});
        if (counts <= 0) {
            res.status(404);
            res.json({
                message: "Id doesn't exist, please try again",
                data: {}
            });
        } else {
            // await User.findByIdAndDelete({_id: req.params.id});
            // req.body._id = req.params.id;
            // const user = await new User(req.body).save();
            // res.status(200);
            // res.json({
            //     message: "OK",
            //     data: user
            // });

            const queryId = req.params.id;
            await User.updateOne({_id: queryId}, req.body);
            res.json({
                message: "OK",
                data: await User.findOne({_id: queryId})
            });
        }
    });

    return router;
}
