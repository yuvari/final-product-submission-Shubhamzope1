const locations = require('../models/locations')

exports.getlocations = (req, res) => {
    locations.find().then(
        response => {
            res.status(200).json({ message: "Locations Fetched Succesfully", locations: response })
        }
    ).catch(
        err => {
            res.status(500).json({ message: "Error", error: err })
        }
    )
}

exports.getLocationById = (req, res) => {
    const location_id = req.params.LocId;
    locations.find({ "name": location_id }).then(
        response => {
            res.status(200).json({ message: "Locations Fetched Succesfully", locations: response })
        }
    ).catch(
        err => {
            res.status(500).json({ message: "Error", error: err })
        }
    )

};