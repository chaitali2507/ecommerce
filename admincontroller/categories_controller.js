var list_cate= require('../adminmodel/categories_model');

exports.insert = async (req,res) =>{
     var data= await list_cate.create(req.body);
     res.status(200).json({
        status:"data insert",
         data
     })
}
exports.get_data = async (req,res) =>{
    var data= await list_cate.find();
    res.status(200).json({
       status:"data view",
       data
    })
}