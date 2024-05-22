var express = require('express');
var router = express.Router();
var user=require('../usercontroller/add_user_controller');
var user_login=require('../usercontroller/user_login_controller');
var add_cart=require('../usercontroller/get_user_cart_controller');
var auth=require('../middleware/auth')

/* GET users listing. */

//user login
router.post('/insert_user_login',user_login.insert);
router.get('/user_login', auth.check_token,user_login.get_data);
router.post('/login',user_login.login);

//add user
router.post('/add_user',user.insert );

//delete_user
router.get('/delete/:id',user.delete_data);

//update_user
router.post('/update/:id', user.update_data);

//get all user
router.get('/get_all_user', user.get_data);

//get a single user
router.get('/get_single_user/:id', user.single_data);

//search user
router.get('/search_user/:name', user.search_user);


//add a cart
router.get('/insert_add_cart/:p_id',add_cart.insert);

//delete a cart
router.get('/delete/:id',add_cart.delete_data);

//update a cart
router.get('/update/:id',add_cart.update_data);

//get all carts
router.get('/get_cart', add_cart.get_data);

//get a single cart
router.get('/get_single_cart/:id', add_cart.single_data);


module.exports = router;
