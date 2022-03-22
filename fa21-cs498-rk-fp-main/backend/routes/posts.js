const PostModel = require("../models/PostModel");
const filter = require('../utils/ourFilter')

module.exports = function (router) {
    router.route('/posts').get(async function (req, res) {
        try {
            const Posts = await filter(req, PostModel);
            res.status(200);
            res.json({
                message: "OK",
                data: Posts
            });
        } catch {
            res.status(500);
            res.json({
                message: "Error",
                data: {}
            });
        }
    })

    // create a new post
    router.route('/posts').post(async function (req, res) {
        if (!req.body.hostID) {
            res.status(500);
            res.json({
                message: "Host ID required",
                data: {},
            });
        } else {
            req.body.dateCreated = new Date();
            const newPost = new PostModel(req.body);
            console.log(req.body);
            const savePost = await newPost.save();
            res.status(201);
            res.json({
                message: "OK",
                data: savePost
            });
        }
    });

    router.route('/posts/:id').get(async function (req, res) {
        const counts = await PostModel.count({_id: req.params.id});
        if (counts <= 0) {
            res.status(404);
            res.json({
                message: "Id not exist",
                data: {}
            })
        } else {
            const user = await PostModel.findById({_id: req.params.id});
            res.json({
                message: "OK",
                data: user
            });
        }
    })

    router.route('/posts/:id').delete(async function (req, res) {
        const counts = await PostModel.count({_id: req.params.id});
        if (counts <= 0) {
            res.status(404);
            res.json({
                message: "Id doesn't exist, please try again",
                data: {}
            });
        } else {
            const deleted = await PostModel.findByIdAndDelete({_id: req.params.id});

            res.status(200);
            res.json({
                message: "OK",
                data: deleted
            });
        }
    });

    router.route('/posts/:id').put(async function (req, res) {
        const counts = await PostModel.count({_id: req.params.id});
        if (counts <= 0) {
            res.status(404);
            res.json({
                message: "Id doesn't exist, please try again",
                data: {}
            });
        } else {
            const queryId = req.params.id;
            await PostModel.updateOne({_id: queryId}, req.body);
            res.json({
                message: "OK",
                data: await PostModel.findOne({_id: queryId})
            });
        }
    });

    router.route('/postSearch').get(async function (req, res) {
        let searchText = req.query.text;
        if (searchText === undefined) {
            res.status(500);
            res.json({
                message: "Error",
                data: "text undefined"
            });
        } else {
            const Posts = await filter({
                query: {
                    where: JSON.stringify({
                        title: {
                            $regex : searchText
                        }
                    })
                }
            }, PostModel);
            res.status(200);
            res.json({
                message: "OK",
                data: Posts
            });
        }
    })

    return router;
};
