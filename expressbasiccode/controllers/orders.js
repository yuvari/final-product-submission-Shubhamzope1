const orders = require('../models/orders');




exports.getorders = (req, res, next) => {
    const { email, firstname, lastname, phNumber, address, menuItems, subTotal, restaurantId, resname } = req.body;
    orders.find({ email: email })
    const userorder = new orders({
        email: email,
        firstname: firstname,
        lastname: lastname,
        phNumber: phNumber,
        address: address,
        menuItems: menuItems,
        subTotal: subTotal,
        restaurantId: restaurantId,
        resname: resname
    });
    userorder.save().then(response => {
            res.status(200).json({ message: "orders feactched Succesfully", orders: response })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })


}

exports.getordersById = (req, res) => {
    const { email } = req.params;
    orders.find({ "email": email })
        .then(response => {
            res.status(200).json({ message: "order Fetched Succesfully", orders: response })
        }).catch(err => {
            res.status(500).json({ error: err })
        })
}