const express = require("express");
const router = express.Router();
const Users = require("../models/Users");

router.post("/register", (req, res) => {

    Users.findOne({ login: req.body.login })
        .then(user => {
            if (user) {
                res.json({status: false});
            } else {
                const newUser = new Users({
                    login: req.body.login,
                    password: req.body.password,
                });
                newUser
                    .save()
                    .then(() => { res.json({ status: true })})
                    .catch((err) => console.log(err));
            }
        })
        .catch(() => res.json({ status: false }));
});

router.post("/login", (req, res) => {
    Users.findOne({ login: req.body.login })
        .then((user) => {
            if (!user) {
                res.json({ status: false })
            } else {
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (!isMatch) {
                        res.json({ status: false })
                    } else {
                        res.json({
                            status: true,
                            userLogin: user.login,
                            userID: user._id,
                        })
                    }
                })
            }
        })
        .catch(err => console.log(err));
})

router.get("/getUsers", (req, res) => {
    Users.find()
        .then(data => {
            console.log(data)
            res.json({ data })
        })
        .catch(err => console.log(err));
});

router.put("/updateResult", (req, res) => {
    Users.findOne({ _id: req.body.playerID })
        .then((user) => {
            console.log('UPDATE user', user)
            if (!user) {
                res.json({ status: false})
            } else {
                if (!user.bestScore || user.bestScore > req.body.result) {
                    console.log('need update')
                    Users.findOneAndUpdate({ _id: req.body.playerID }, {
                        bestScore: req.body.result
                    })
                    .then(() => res.json({ status: true}))
                    .catch(err => {
                        console.log(err)
                        res.json({ status: false})
                    })
                } else {
                    console.log('dont need')
                }
            }


            
        })
        .catch(err => {
            console.log(err)
            res.json({ status: false})
        })
})

module.exports = router;