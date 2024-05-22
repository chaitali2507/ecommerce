var express = require('express');
var router = express.Router();
var admin_login=require('../admincontroller/login_controller');
var auth=require('../middleware/auth');
var product=require('../admincontroller/product_controller');
var list_cate=require('../admincontroller/categories_controller')


/* GET home page. */
router.post('/insert_admin_login',admin_login.insert);
router.get('/admin_login', admin_login.get_data);
router.post('/login',admin_login.login);

//add_product
router.post('/add_product',product.insert);

//delete_product
router.get('/delete/:id',product.delete_data);

//update_product
router.post('/update/:id', product.update_data);

//get all product
router.get('/get_all_product', product.get_data);

//get a single product
router.get('/get_single_product/:id', product.single_data);

//search products
router.get('/search_product/:title', product.search_product);

//get all products categories
router.post('/categories',list_cate.insert)
router.get('/get_all_categories',list_cate.get_data)

//get products of category
router.get('/product_category/:category', product.product_category);

module.exports = router;
