const items = require('../models/menuitems');

exports.getMenuItemsByRestaurant = (req, res) => {
    const { resId } = req.params;
    items.find({ restaurantId: resId })
        .then(response => {
            res.status(200).json({ message: "Menu Items Fetched Succesfully", items: response })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}