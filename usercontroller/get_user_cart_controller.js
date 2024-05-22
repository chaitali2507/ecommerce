var add_cart = require('../usermodel/get_user_cart_model');
var add_product = require('../adminmodel/product_model');
const storage = require('node-persist');
storage.init( /* options ... */ );

exports.insert = async (req,res) => {

    var p_id = req.params.p_id;
    const userId = await storage.getItem("user_id")
    console.log(userId);
    req.body.p_qty = 1;
    req.body.user_id = userId;
    req.body.p_id = p_id;

    var data = await add_cart.find({"p_id":p_id,"user_id":userId});
    
    if(data.length!=0)
    {
        var p_qty = parseInt(data[0].p_qty);
        req.body.p_qty = ++p_qty;
        
        var product_price = await add_product.findById(p_id)
        var total = product_price.price * req.body.p_qty
        req.body.total = total;
        
        var product_price = await add_product.findById(p_id)
        var discount = total/product_price.discount;
        req.body.discount = Math.ceil(discount);

        console.log(req.body.discount);

        var data = await add_cart.findByIdAndUpdate(data[0].id,req.body);
        data['total']=total;
    }else{

        var product_price = await add_product.findById(p_id)

        var total = product_price.price * req.body.p_qty
        req.body.total = total;
        
        var product_price = await add_product.findById(p_id)
        var discount = (total  * product_price.discount )/100
        req.body.discount = discount;

        var data = await add_cart.create(req.body);
        
    }
    res.status(200).json({
        status:"Add Cart",
        data
    })
}

exports.get_data=async (req,res)=>{
    try {
 
     //pagination
     var limit=1;
 
     var page_no=req.query.page_no;
     if (page_no==undefined)
     {
         page_no=1;
     }
     var start=(page_no-1)*limit;
 
     var data=await add_cart.find().populate("p_id").populate("user_id").limit(limit).skip(start);
     var total_record =await add_cart.find().count();
 
     var total_page=Math.ceil(total_record/limit);
     res.status(200).json({
         data,
         total_record,
         total_page
     })
    } catch (error) {
     res.status(200).json({
         error
     })
    }
 }
 exports.delete_data = async (req,res) =>{
    var id=req.params.id;
    var data= await add_cart.findByIdAndDelete(id);
    res.status(200).json({
       status:"data deleted",
    })
 }
 exports.update_data = async (req,res) =>{
    var id=req.params.id;
    var data= await add_cart.findByIdAndUpdate(id,req.body).populate("p_id").populate("user_id");
    res.status(200).json({
       status:"data update",
       data
    })
 }
 exports.single_data = async (req,res) =>{
    var id=req.params.id
    var data= await add_cart.findById(id,req.body).populate("p_id").populate("user_id");
    res.status(200).json({
       status:"single product",
       data
    })
 }
 