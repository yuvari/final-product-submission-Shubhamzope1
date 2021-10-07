const mealtypes = require('../models/mealtypes')


exports.getmealtypes = (req, res) => {
    mealtypes.find().then(
        response => {
            res.status(200).json({ message: "mealtypes Fetched Succesfully", mealtypes: response })
        }
    ).catch(
        err => {
            res.status(500).json({ message: "Error", error: err })
        }
    )
};