    const express = require('express');
    const route = express.Router();
    const locationcontroller = require('../controllers/locations');
    const meaaltypecontroller = require('../controllers/mealtype');
    const restaurantController = require('../controllers/restaurants');
    const menuItemsController = require('../controllers/menuitems');
    const paymentController = require('../controllers/payment');
    const userController = require('../controllers/user');
    const ordersController = require('../controllers/orders');

    route.get('/locations', locationcontroller.getlocations);
    route.get('/mealtype', meaaltypecontroller.getmealtypes);
    //route.get('/locations/:LocId', locationcontroller.getLocationById);
    route.post('/filter', restaurantController.filterRestaurant);
    route.get('/restaurants/:locationId', restaurantController.getRestaurantsByLocation);
    route.get('/restaurant/:resId', restaurantController.getRestaurantsDetailsById);
    route.get('/menuitems/:resId', menuItemsController.getMenuItemsByRestaurant);
    route.post('/login', userController.getlogein);
    route.post('/signup', userController.getsignin);
    route.post('/payment', paymentController.payment);
    route.post('/callback', paymentController.callback);

    route.get('/login/:email', userController.getuserById);
    route.post('/orders', ordersController.getorders);
    route.get('/orders/:email', ordersController.getordersById);
    module.exports = route;