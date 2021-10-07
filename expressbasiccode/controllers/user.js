const user = require('../models/user');

exports.getlogein = (req, res) => {
    const { email, password } = req.body;
    user.find({ email: email, password: password })
        .then(response => {
            if (response.length > 0) {
                res.status(200).json({ message: "user Logedin Succesfully", isauthenticateduser: true, user: response })
            } else {
                res.status(200).json({ message: "user Logedin unSuccesful", isauthenticateduser: false, user: response })
            }
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}



exports.getsignin = (req, res, next) => {
    const { email, password, firstname, lastname, phNumber, address } = req.body;
    user.find({ email: email })
        .then(response => {
            if (response.length >= 1) {
                res.status(200).json({ message: "user already exist", user: response })

            } else {
                const usersignedin = new user({ email: email, password: password, firstname: firstname, lastname: lastname, phNumber: phNumber, address: address });
                usersignedin.save().then(response => {
                        res.status(200).json({ message: "user registerd Succesfully", user: response })
                    })
                    .catch(err => {
                        res.status(500).json({ error: err })
                    })
            }
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })



}
exports.getuserById = (req, res) => {
    const { email } = req.params;
    user.find({ "email": email })
        .then(response => {
            res.status(200).json({ message: "user Fetched Succesfully", user: response })
        }).catch(err => {
            res.status(500).json({ error: err })
        })
}